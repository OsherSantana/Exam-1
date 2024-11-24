

let products = [];


function loadProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
}

function addUserChoicesToTable() {
    if (!validateForm()) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const productName = getProductName();
    const productPrice = getProductPrice();
    const productCategory = getProductCategory();
    const imageUrl = getImageUrl();

    const product = {
        name: productName,
        price: productPrice,
        category: productCategory,
        imageUrl: imageUrl
    };

    products.push(product);
    saveProductsToLocalStorage();


    addRowToTable(product);
    updateProductList();
    resetForm();
}

function validateForm() {
    const productName = getProductName();
    const productPrice = getProductPrice();
    const productCategory = getProductCategory();
    const imageUrl = getImageUrl();

    return productName && productPrice && productCategory && imageUrl;
}


function getProductName() {
    return document.getElementById('productName').value;
}

function getProductPrice() {
    return document.getElementById('productPrice').value;
}

function getProductCategory() {
    return document.getElementById('productCategory').value;
}

function getImageUrl() {
    return document.getElementById('imageUrl').value;
}

// Add new row to the product table
function addRowToTable(product) {
    const tableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    const newRow = `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}" style="width:50px;height:50px;"></td>
            <td><button onclick="deleteProduct('${product.name}')">Delete</button></td> <!-- Delete button -->
        </tr>
    `;

    tableBody.innerHTML += newRow;
}


function updateProductList() {
    const listItems = document.getElementById('listItems');
    let itemsHTML = '';


    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        itemsHTML += `<li>${product.name} - $${product.price} (${product.category})</li>`;
    }


    listItems.innerHTML = itemsHTML;
}


function resetForm() {
    document.getElementById('shoppingCartForm').reset();
}

function deleteProduct(productName) {
    products = products.filter(function (product) {
        return product.name !== productName;
    });
    saveProductsToLocalStorage();

    rebuildTable();
    updateProductList();
}

function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function rebuildTable() {
    const tableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';


    for (let i = 0; i < products.length; i++) {
        addRowToTable(products[i]);
    }
}


window.onload = function () {
    loadProductsFromLocalStorage();

    for (let i = 0; i < products.length; i++) {
        addRowToTable(products[i]);
    }
    updateProductList();
}
