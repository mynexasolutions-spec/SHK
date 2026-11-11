const fs = require('fs');
let code = fs.readFileSync('data/products.ts', 'utf8');

// Revert back to original product images as requested by the user
code = code.replace(/image:\s*['"]\/images\/hero-card-battery\.jpg['"]/g, 'image: "/images/battery.jpg"');
code = code.replace(/image:\s*['"]\/images\/hero-card-piston\.jpg['"]/g, 'image: "/images/piston.jpg"');
code = code.replace(/image:\s*['"]\/images\/piston-conrod\.jpg['"]/g, 'image: "/images/piston.jpg"');
code = code.replace(/image:\s*['"]\/images\/hero-card-liner\.jpg['"]/g, 'image: "/images/cylinder-liner.jpg"');
code = code.replace(/image:\s*['"]\/images\/cylinder-liner-cutaway\.jpg['"]/g, 'image: "/images/cylinder-liner.jpg"');
code = code.replace(/image:\s*['"]\/images\/hero-card-valves\.jpg['"]/g, 'image: "/images/valves.jpg"');

fs.writeFileSync('data/products.ts', code, 'utf8');
console.log('Successfully restored previous product images in data/products.ts');

