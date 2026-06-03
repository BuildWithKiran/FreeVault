const fs = require('fs');
const path = require('path');

const markdown = fs.readFileSync(path.join(__dirname, 'dataset.md'), 'utf8');

const lines = markdown.split('\n');
const data = [];
let currentCategory = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Match category headers e.g. ## 🎬 01. Reels & Social Media
  const catMatch = line.match(/^##\s*(.*?)\s*\d+\.\s*(.*)$/);
  if (catMatch) {
    currentCategory = {
      id: catMatch[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      icon: catMatch[1].replace(/#/g, '').trim(),
      name: catMatch[2].trim(),
      resources: []
    };
    data.push(currentCategory);
    continue;
  }

  // Fallback category header if no numbers e.g. ## ✍️ Writing & Language
  const catMatch2 = line.match(/^#+\s*(.*?)\s*([A-Za-z].*)$/);
  if (catMatch2 && !catMatch && !line.includes('TABLE OF CONTENTS')) {
    // Check if it's already caught by catMatch (meaning it has a number)
    if (!line.match(/\d+\./)) {
      currentCategory = {
        id: catMatch2[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        icon: catMatch2[1].replace(/#/g, '').trim(),
        name: catMatch2[2].trim(),
        resources: []
      };
      // Prevent duplicates or bad parses
      if (!data.find(c => c.name === currentCategory.name)) {
        data.push(currentCategory);
      } else {
        currentCategory = data.find(c => c.name === currentCategory.name);
      }
      continue;
    }
  }

  if (currentCategory && line.startsWith('|') && !line.includes('---')) {
    // Ignore header row (usually contains 'Site' or 'Link')
    if (line.toLowerCase().includes('| site |') || line.toLowerCase().includes('| link |') || line.toLowerCase().includes('| tool |') || line.toLowerCase().includes('| resource |')) {
      continue;
    }

    const columns = line.split('|').map(s => s.trim()).filter(s => s);
    
    if (columns.length >= 2) {
      let nameStr = columns[0];
      // Extract from **Name**
      const nameMatch = nameStr.match(/\*\*(.*?)\*\*/);
      const name = nameMatch ? nameMatch[1] : nameStr.replace(/\*/g, '').trim();

      let url = '';
      let description = '';

      if (columns.length === 2) {
        // Name | Link
        url = columns[1];
        // sometimes name column has description e.g. **unDraw** — CC0 open source
        if (nameStr.includes('—')) {
            const parts = nameStr.split('—');
            description = parts.slice(1).join('—').trim();
        }
      } else if (columns.length >= 3) {
        // Name | Description | Link
        description = columns[1];
        url = columns[2];
      }

      // Clean URL markdown if it is linked like [url](url)
      const urlMatch = url.match(/\]\((.*?)\)/);
      if (urlMatch) {
        url = urlMatch[1];
      }
      
      // Sometimes URL is just text
      if (url.startsWith('http')) {
         currentCategory.resources.push({
           name,
           description,
           url
         });
      }
    }
  }
}

// Clean up empty categories
const finalData = data.filter(c => c.resources.length > 0);

// We want to ensure src/data exists
const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'dataset.json'), JSON.stringify(finalData, null, 2));
console.log('Successfully parsed dataset.json');
