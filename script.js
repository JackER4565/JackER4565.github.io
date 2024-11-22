document.addEventListener("DOMContentLoaded", async () => {
    const textArea = document.getElementById('dataInput');
    const processButton = document.getElementById('processData');
    
    function findPackByUniqueWord(inputName, supporterPacks) {
        // Extract the unique part using regex
        const regex = /^(.*?)\s(Supporter|Pack|Vault Pass)/;
        const match = inputName.match(regex);
        
        if (!match) return null;
        
        const uniquePart = match[1]; // The captured unique part
        
        // Find matching pack
        return Object.entries(supporterPacks).find(([name]) => 
            name.toLowerCase().includes(uniquePart.toLowerCase())
        )?.[0];
    }
    
    processButton.addEventListener('click', async () => {
        let text = textArea.value;
        if (!text.trim()) return;
        
        // Remove everything before and including "Account Transactions"
        text = text.split("Account Transactions").pop() || text;
        
        // Remove "AvatarChange avatar" and everything after it
        text = text.split("AvatarChange avatar")[0] || text;
        
        const lines = text.split('\n').filter(line => line.trim());
        const data = [];
        
        // Load supporter packs first
        const supporterPacks = await loadSupporterPacks();
        
        for (let i = 0; i < lines.length; i += 2) {
            if (i + 1 >= lines.length) break;
            
            const inputName = lines[i].trim();
            const rawDate = lines[i + 1].trim();
            
            // Find matching pack name from CSV
            const matchedPackName = findPackByUniqueWord(inputName, supporterPacks);
            
            const date = new Date(rawDate);
            const formattedDate = date.toISOString().replace('T', ' ').slice(0, 19);
            
            data.push({
                originalName: inputName,
                matchedName: matchedPackName,
                date: formattedDate
            });
        }

        const filteredData = data.map(item => {
            const details = supporterPacks[item.matchedName];
            
            if (!details) {
                console.log('No match found for:', {
                    original: item.originalName,
                    matched: item.matchedName
                });
            }
            
            return {
                name: item.matchedName || item.originalName,
                date: item.date,
                price: details ? details.price : "N/A",
            };
        });

        // Calculate total
        const total = filteredData.reduce((sum, item) => {
            return sum + (item.price !== "N/A" ? item.price : 0);
        }, 0);

        // Update total display
        document.getElementById('totalSpent').textContent = `$${total}`;

        // Update table
        const tableBody = document.querySelector("table tbody");
        tableBody.innerHTML = '';

        filteredData.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.date}</td>
                <td>$${item.price}</td>
            `;
            tableBody.appendChild(row);
        });
    });
});

// Función para procesar el CSV y convertirlo al formato deseado
async function loadSupporterPacks() {
    try {
        const response = await fetch('packs.csv');
        const csvText = await response.text();
        
        const supporterPacks = {};
        
        // Dividir el CSV en líneas y procesar cada una
        csvText.split('\n').forEach(line => {
            if (!line.trim()) return; // Saltar líneas vacías
            
            // Manejar correctamente las comas dentro de comillas
            const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
            if (!matches) return;
            
            const [name, shortName, price, points] = matches.map(field => 
                field.replace(/^,|"/g, '').trim() // Limpiar comas y comillas
            );
            
            // Solo agregar si tenemos todos los valores necesarios
            if (name && price) {
                supporterPacks[name] = {
                    price: parseInt(price.replace(/\$|USD|\s/g, '')) // Extraer solo el número
                };
            }
        });
        console.log(supporterPacks);
        return supporterPacks;
    } catch (error) {
        console.error('Error loading supporter packs:', error);
        return {};
    }
}
