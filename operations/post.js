// operations/post.js
// Operaciones POST para crear productos

// Constante para la URL base de la API
const FAKESTORE_API_BASE = 'https://fakestoreapi.com';

// Función para crear un nuevo producto
export async function createProduct(title, price, category, description = "Producto creado desde la aplicación de gestión") {
    console.log(`Creando nuevo producto...\n`);
    console.log(` Título: ${title}`);
    console.log(` Precio: $${price}`);
    console.log(` Categoría: ${category}\n`);
    
    try {
        // Validar precio
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            throw new Error(`El precio debe ser un número positivo. Precio proporcionado: "${price}"`);
        }
        
        // Crear el objeto del producto usando las mejores prácticas
        const newProduct = {
            title: title.trim(),
            price: numericPrice,
            description: description,
            image: "https://i.pravatar.cc/300",
            category: category.trim().toLowerCase()
        };
        
        const response = await fetch(`${FAKESTORE_API_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const createdProduct = await response.json();
        
        // Se usa destructuracion para mostrar el resultado
        const { 
            id, 
            title: createdTitle, 
            price: createdPrice, 
            description: createdDescription, 
            category: createdCategory,
            image 
        } = createdProduct;
        
        console.log(`Producto creado exitosamente:\n`);
        console.log(`  ID asignado: ${id}`);
        console.log(` Título: ${createdTitle}`);
        console.log(` Precio: $${createdPrice}`);
        console.log(` Categoría: ${createdCategory}`);
        console.log(` Descripción: ${createdDescription}`);
        console.log(`  Imagen: ${image}`);
        console.log('═'.repeat(60));
        console.log('   El producto no se guarda realmente en la base de datos');
        
    } catch (error) {
        console.error(' Error creando producto:', error.message);
    }
}

// Función auxiliar para validar parámetros de entrada
export function validateProductData(title, price, category) {
    const errors = [];
    
    if (!title || title.trim().length === 0) {
        errors.push('El título es requerido y no puede estar vacío');
    }
    
    if (!price) {
        errors.push('El precio es requerido');
    } else {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            errors.push(`El precio debe ser un número positivo (proporcionado: "${price}")`);
        }
    }
    
    if (!category || category.trim().length === 0) {
        errors.push('La categoría es requerida y no puede estar vacía');
    }
    
    return errors;
}