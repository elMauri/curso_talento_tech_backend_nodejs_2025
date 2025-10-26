// Proyecto de Gestión de Productos con FakeStore API
// Punto de entrada principal

// Se importan las operaciones desde archios separados
import { getAllProducts, getProductById } from './operations/get.js';
import { deleteProductById } from './operations/delete.js';
import { createProduct, validateProductData } from './operations/post.js';


const args = process.argv.slice(2); // Se remueve el 'node' y el 'index.js'

// Función principal para procesar comandos
async function main() {
    console.log('  Sistema de Gestión de Productos - FakeStore API');
    
    // Se verifica si se envian argumentos al script
    if (args.length === 0) {
        showHelp();
        return;
    }
    
  
    const [method, resource, ...extraParams] = args;
    
    // Se valida que se envie GET, DELETE o POST
    const allowedMethods = ['GET', 'DELETE', 'POST'];
    if (!allowedMethods.includes(method.toUpperCase())) {
        console.log(`Error: Solo se admiten los métodos: ${allowedMethods.join(', ')}`);
        console.log(`Método enviado: "${method}"`);
        showHelp();
        return;
    }
    
    // Funcion que procesa los diferentes tipos de recursos
    await processCommand(method.toUpperCase(), resource, extraParams);
}

// Función para mostrar la ayuda
function showHelp() {
    console.log('\n Comandos disponibles:');
    console.log('  npm run start GET products                    - Obtener todos los productos');
    console.log('  npm run start GET products/<id>               - Obtener producto específico por ID');
    console.log('  npm run start DELETE products/<id>            - Eliminar producto específico por ID');
    console.log('  npm run start POST products <title> <price> <category> - Crear nuevo producto');
    console.log('\n Ejemplos:');
    console.log('  npm run start GET products');
    console.log('  npm run start GET products/15');
    console.log('  npm run start DELETE products/7');
    console.log('  npm run start POST products TShirt-Rex 300 remeras');
}

// Función para procesar comandos
async function processCommand(method, resource, extraParams) {
    try {
        // Se usa métodos de strings para procesar el recurso
        const resourceParts = resource.split('/');
        const [resourceType, resourceId] = resourceParts;
        
        if (resourceType !== 'products') {
            console.log(' Error: Solo se admite el recurso "products"');
            showHelp();
            return;
        }
        
        // Se Procesa según el método HTTP
        if (method === 'GET') {
            if (resourceId) {
                // Validar que el ID sea un número válido para GET
                const id = parseInt(resourceId);
                if (isNaN(id) || id <= 0) {
                    console.log(' Error: El ID del producto debe ser un número positivo');
                    console.log(` ID proporcionado: "${resourceId}"`);
                    showHelp();
                    return;
                }
                // Consultar producto específico
                await getProductById(resourceId);
            } else {
                // Consultar todos los productos
                await getAllProducts();
            }
            
        } else if (method === 'DELETE') {
            if (!resourceId) {
                console.log(' Error: DELETE requiere un ID de producto específico');
                console.log(' El uso correcto del DELETE: npm run start DELETE products/<id>');
                showHelp();
                return;
            }
            
            // Se valida que el ID sea un numero valido para el DELETE
            const id = parseInt(resourceId);
            if (isNaN(id) || id <= 0) {
                console.log(' Error: El ID del producto debe ser un número positivo');
                console.log(` ID proporcionado: "${resourceId}"`);
                showHelp();
                return;
            }
            // Eliminar producto específico
            await deleteProductById(resourceId);
            
        } else if (method === 'POST') {
            if (resourceId) {
                console.log('Error: POST no debe incluir ID en la URL');
                console.log('Uso correcto del POST: npm run start POST products <title> <price> <category>');
                showHelp();
                return;
            }
            
            // Para POST, los parámetros vienen en extraParams
            // Formato esperado: POST products <title> <price> <category>
            const [title, price, category] = extraParams;
            
            // Validar que se proporcionaron los parámetros requeridos
            if (!title || !price || !category) {
                console.log('Error: POST requiere título, precio y categoría');
                console.log('Uso correcto: npm run start POST products <title> <price> <category>');
                console.log('Ejemplo: npm run start POST products TShirt-Rex 300 remeras');
                
                // Mostrar qué parámetros se recibieron usando destructuracion
                const [receivedTitle = 'NO_DEFINIDO', receivedPrice = 'NO_DEFINIDO', receivedCategory = 'NO_DEFINIDO'] = extraParams;
                console.log(`Parámetros recibidos:`);
                console.log(`   Título: ${receivedTitle}`);
                console.log(`   Precio: ${receivedPrice}`);
                console.log(`   Categoría: ${receivedCategory}`);
                
                showHelp();
                return;
            }
            
            // Validar datos usando la función auxiliar
            const validationErrors = validateProductData(title, price, category);
            if (validationErrors.length > 0) {
                console.log('❌ Errores de validación:');
                validationErrors.forEach(error => console.log(`   • ${error}`));
                showHelp();
                return;
            }
            
            // Crear producto
            await createProduct(title, price, category);
        }
        
    } catch (error) {
        console.error('❌ Error procesando comando:', error.message);
    }
}



// Ejecutar la función principal
main().catch(error => {
    console.error('💥 Error fatal:', error.message);
    process.exit(1);
});