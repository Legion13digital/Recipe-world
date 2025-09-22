// Обработка страницы результатов поиска
document.addEventListener('DOMContentLoaded', function() {
    const searchResults = document.getElementById('search-results');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    const clearSearchBtn = document.getElementById('clear-search');
    
    // Получаем поисковый запрос из localStorage
    const query = localStorage.getItem('searchQuery') || '';
    
    if (query) {
        // В реальном приложении здесь был бы запрос к серверу
        // Для демонстрации используем статические данные
        displaySearchResults(query);
    } else {
        // Если запрос пустой, показываем сообщение
        searchResults.innerHTML = '';
        noResults.classList.remove('hidden');
        noResults.innerHTML = '<p>Введите поисковый запрос на главной странице.</p>';
        resultsCount.textContent = '0';
    }
    
    // Обработка кнопки очистки поиска
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            localStorage.removeItem('searchQuery');
            searchResults.innerHTML = '';
            noResults.classList.remove('hidden');
            noResults.innerHTML = '<p>Поиск очищен. Введите новый запрос на главной странице.</p>';
            resultsCount.textContent = '0';
        });
    }
    
    function displaySearchResults(query) {
        // В реальном приложении здесь была бы фильтрация по запросу
        // Для демонстрации просто показываем все рецепты
        const recipes = [
            {
                id: 1,
                name: 'Спагетти Болоньезе',
                image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSI1MCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiI+U3BhZ2hldHRpIEJvbG9uZXNlPC90ZXh0Pjwvc3ZnPg==',
                description: 'Классическое итальянское блюдо с мясным соусом'
            },
            {
                id: 2,
                name: 'Чикен Карри',
                image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSI2MCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiI+Q2hpY2tlbiBDdXJyeTwvdGV4dD48L3N2Zz4=',
                description: 'Ароматное блюдо с курицей и специями'
            },
            {
                id: 3,
                name: 'Салат Цезарь',
                image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSI3MCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiI+U2FsYWQgQ2Flc2FyPC90ZXh0Pjwvc3ZnPg==',
                description: 'Свежий салат с хрустящими гренками'
            }
        ];
        
        // Также пытаемся получить рецепты из localStorage
        const localRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        const allRecipes = [...recipes, ...localRecipes];
        
        // Фильтруем рецепты по запросу
        const filteredRecipes = allRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            recipe.description.toLowerCase().includes(query.toLowerCase()) ||
            (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
        );
        
        // Показываем результаты
        if (filteredRecipes.length > 0) {
            searchResults.innerHTML = '';
            filteredRecipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <a href="recipe.html?id=${recipe.id}" class="btn">Смотреть рецепт</a>
                `;
                searchResults.appendChild(recipeCard);
            });
            noResults.classList.add('hidden');
            resultsCount.textContent = filteredRecipes.length;
        } else {
            searchResults.innerHTML = '';
            noResults.classList.remove('hidden');
            noResults.innerHTML = `<p>По запросу "${query}" ничего не найдено.</p>`;
            resultsCount.textContent = '0';
        }
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
            // Перезагружаем страницу для отображения новых результатов
            window.location.reload();
        }
    }
});
