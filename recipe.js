// Обработка страницы рецепта
document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID рецепта из URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    
    // В реальном приложении здесь был бы запрос к серверу
    // или получение данных из localStorage
    
    // Обработка поиска (аналогично главной странице)
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
