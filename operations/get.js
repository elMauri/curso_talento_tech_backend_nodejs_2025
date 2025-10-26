// operations/get.js
// Operaciones GET para consultar productos

// Constante para la URL base de la API
const FAKESTORE_API_BASE = 'https://fakestoreapi.com';

// Función para obtener todos los productos
export async function getAllProducts() {
    console.log(' Obteniendo todos los productos...\n');
    
    try {
        const response = await fetch(`${FAKESTORE_API_BASE}/products`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const products = await response.json();
        
        console.log(`✅ Se encontraron ${products.length} productos:\n`);
        
        // Se usa destructuracion y métodos de array para mostrar productos
        products.forEach(({ id, title, price, category, rating: { rate, count } }) => {
            console.log(`  ID: ${id}`);
            console.log(` Producto: ${title.substring(0, 50)}${title.length > 50 ? '...' : ''}`);
            console.log(` Precio: $${price}`);
            console.log(` Categoría: ${category}`);
            console.log(` Rating: ${rate}/5 (${count} reseñas)`);
            console.log('─'.repeat(50));
        });
        
    } catch (error) {
        console.error(' Error conectando con FakeStore API:', error.message);
        console.log('\n🔧 Mostrando datos de ejemplo (modo demostración):\n');
        
        // Datos de ejemplo para demostrar el funcionamiento
        const exampleProducts = [
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                category: "men's clothing",
                rating: { rate: 3.9, count: 120 }
            },
            {
                id: 2,
                title: "Mens Casual Premium Slim Fit T-Shirts",
                price: 22.3,
                category: "men's clothing",
                rating: { rate: 4.1, count: 259 }
            },
            {
                id: 3,
                title: "Mens Cotton Jacket",
                price: 55.99,
                category: "men's clothing",
                rating: { rate: 4.7, count: 500 }
            }
        ];
        
        console.log(`✅ Mostrando ${exampleProducts.length} productos de ejemplo:\n`);
        
        // Se usa destructuracion y métodos de array para mostrar productos
        exampleProducts.forEach(({ id, title, price, category, rating: { rate, count } }) => {
            console.log(`🏷️  ID: ${id}`);
            console.log(`📦 Producto: ${title.substring(0, 50)}${title.length > 50 ? '...' : ''}`);
            console.log(`💰 Precio: $${price}`);
            console.log(`🏪 Categoría: ${category}`);
            console.log(`⭐ Rating: ${rate}/5 (${count} reseñas)`);
            console.log('─'.repeat(50));
        });
    }
}

// Función para obtener un producto por ID
export async function getProductById(id) {
    console.log(`🔄 Obteniendo producto con ID: ${id}...\n`);
    
    try {
        const response = await fetch(`${FAKESTORE_API_BASE}/products/${id}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const product = await response.json();
        
        // Se usa destructuracion para extraer las propiedades del producto
        const { 
            id: productId, 
            title, 
            price, 
            description, 
            category, 
            image, 
            rating: { rate, count } 
        } = product;
        
        console.log(`Producto encontrado:\n`);
        console.log(`  ID: ${productId}`);
        console.log(` Producto: ${title}`);
        console.log(` Precio: $${price}`);
        console.log(` Categoría: ${category}`);
        console.log(` Descripción: ${description.substring(0, 100)}${description.length > 100 ? '...' : ''}`);
        console.log(`  Imagen: ${image}`);
        console.log(` Rating: ${rate}/5 (${count} reseñas)`);
        console.log('═'.repeat(60));
        
    } catch (error) {
        console.error(' Error obteniendo producto:', error.message);
        
        // Datos de ejemplo para demostración si falla la conexión
        if (error.message.includes('fetch failed')) {
            console.log('\n🔧 Mostrando datos de ejemplo (modo demostración):\n');
            
            const exampleProduct = {
                id: parseInt(id) || 1,
                title: "Producto de Ejemplo - ID " + id,
                price: 99.99,
                description: "Esta es una descripción de ejemplo para demostrar el funcionamiento del sistema cuando no hay conexión a internet.",
                category: "electronics",
                image: "https://example.com/image.jpg",
                rating: { rate: 4.5, count: 150 }
            };
            
            const { 
                id: productId, 
                title, 
                price, 
                description, 
                category, 
                image, 
                rating: { rate, count } 
            } = exampleProduct;
            
            console.log(`Producto de ejemplo (ID: ${id}):\n`);
            console.log(`ID: ${productId}`);
            console.log(`Producto: ${title}`);
            console.log(`Precio: $${price}`);
            console.log(`Categoría: ${category}`);
            console.log(`Descripción: ${description.substring(0, 100)}${description.length > 100 ? '...' : ''}`);
            console.log(` Imagen: ${image}`);
            console.log(` Rating: ${rate}/5 (${count} reseñas)`);
            console.log('═'.repeat(60));
        }
    }
}