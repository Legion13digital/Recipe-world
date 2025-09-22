// Обработка формы добавления рецепта
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-recipe-form');
    const ingredientsContainer = document.getElementById('ingredients-container');
    const stepsContainer = document.getElementById('steps-container');
    const tagsList = document.getElementById('tags-list');
    const tagInput = document.getElementById('tag-input');
    
    let tags = [];
    
    // Добавление ингредиента
    document.getElementById('add-ingredient').addEventListener('click', function() {
        const ingredientRow = document.createElement('div');
        ingredientRow.className = 'ingredient-row';
        ingredientRow.innerHTML = `
            <input type="text" placeholder="Ингредиент" class="ingredient-name">
            <input type="text" placeholder="Количество" class="ingredient-amount">
            <button type="button" class="remove-ingredient">Удалить</button>
        `;
        ingredientsContainer.appendChild(ingredientRow);
        
        // Добавляем обработчик для кнопки удаления
        ingredientRow.querySelector('.remove-ingredient').addEventListener('click', function() {
            ingredientsContainer.removeChild(ingredientRow);
        });
    });
    
    // Добавление шага
    document.getElementById('add-step').addEventListener('click', function() {
        const stepRow = document.createElement('div');
        stepRow.className = 'step-row';
        stepRow.innerHTML = `
            <textarea placeholder="Опишите шаг приготовления" class="step-text"></textarea>
            <button type="button" class="remove-step">Удалить</button>
        `;
        stepsContainer.appendChild(stepRow);
        
        // Добавляем обработчик для кнопки удаления
        stepRow.querySelector('.remove-step').addEventListener('click', function() {
            stepsContainer.removeChild(stepRow);
        });
    });
    
    // Добавление меток
    tagInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tagText = tagInput.value.trim();
            if (tagText && !tags.includes(tagText)) {
                tags.push(tagText);
                renderTags();
                tagInput.value = '';
            }
        }
    });
    
    function renderTags() {
        tagsList.innerHTML = '';
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.innerHTML = `
                ${tag}
                <span class="remove-tag" data-tag="${tag}">×</span>
            `;
            tagsList.appendChild(tagElement);
        });
        
        // Добавляем обработчики для удаления меток
        document.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const tagToRemove = this.getAttribute('data-tag');
                tags = tags.filter(tag => tag !== tagToRemove);
                renderTags();
            });
        });
    }
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const recipe = {
            id: Date.now(), // Используем timestamp как ID
            name: document.getElementById('recipe-name').value,
            image: document.getElementById('recipe-image').value,
            description: document.getElementById('recipe-description').value,
            category: document.getElementById('recipe-category').value,
            ingredients: [],
            steps: [],
            tags: tags
        };
        
        // Собираем ингредиенты
        document.querySelectorAll('.ingredient-row').forEach(row => {
            const name = row.querySelector('.ingredient-name').value;
            const amount = row.querySelector('.ingredient-amount').value;
            if (name && amount) {
                recipe.ingredients.push({ name, amount });
            }
        });
        
        // Собираем шаги приготовления
        document.querySelectorAll('.step-row').forEach((row, index) => {
            const text = row.querySelector('.step-text').value;
            if (text) {
                recipe.steps.push({ number: index + 1, text });
            }
        });
        
        // Сохраняем рецепт в localStorage
        saveRecipe(recipe);
        
        // Очищаем форму и показываем сообщение об успехе
        form.reset();
        ingredientsContainer.innerHTML = '';
        stepsContainer.innerHTML = '';
        tags = [];
        renderTags();
        
        alert('Рецепт успешно добавлен!');
    });
    
    function saveRecipe(recipe) {
        // Получаем существующие рецепты из localStorage или создаем пустой массив
        const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        // Добавляем новый рецепт
        recipes.push(recipe);
        // Сохраняем обратно в localStorage
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
    
    // Обработка поиска (аналогично другим страницам)
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            localStorage.setItem('searchQuery', query);
            window.location.href = 'search-results.html';
        }
    }
});
