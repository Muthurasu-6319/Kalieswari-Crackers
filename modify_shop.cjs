const fs = require('fs');

const path = 'src/pages/Shop.jsx';
let content = fs.readFileSync(path, 'utf8');

const category_order_str = `
  const categoryOrder = [
    'one-sound-crackers',
    'deluxe-crackers',
    'giant-crackers',
    'garland-crackers',
    'bijili-crackers',
    'bomb-crackers',
    'adiyal',
    'ground-chakkara',
    'flower-pots',
    'peacock-series',
    'twinkling-star',
    'siren',
    'lovely-sparklers',
    'rocket',
    'fancy-novelties',
    'gun-shoot-war',
    'multi-colour-fountain',
    'kids-special',
    'special-edition-2026',
    'spl-education-2026',
    'fancy-out-items',
    'sparklers-7cm',
    'sparklers-10cm',
    'sparklers-12cm',
    'sparklers-15cm',
    'sparklers-30cm',
    'sparklers-50cm',
    'gift-boxes'
  ];
`;

content = content.replace("const urlCategory = searchParams.get('category');", "const urlCategory = searchParams.get('category');\\n" + category_order_str);
content = content.replace("    return true;\\n  });", "    return true;\\n  }).sort((a, b) => parseInt(a.id.replace('p', '')) - parseInt(b.id.replace('p', '')));");
content = content.replace("{categories.map(category => {", "{[...categories].sort((a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id)).map(category => {");

const old_grid = `<div className="grid grid-cols-3">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>`;

const new_grid = `<div>
              {categoryOrder.map(catId => {
                const catProducts = displayedProducts.filter(p => p.categoryId === catId);
                if (catProducts.length === 0) return null;
                const catInfo = categories.find(c => c.id === catId);
                return (
                  <div key={catId} style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary-color)' }}>
                      {catInfo ? catInfo.name : catId}
                    </h3>
                    <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
                      {catProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>`;

content = content.replace(old_grid, new_grid);

fs.writeFileSync(path, content);
console.log('Done!');
