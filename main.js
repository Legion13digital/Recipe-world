// Обработка поиска на главной странице
document.addEventListener('DOMContentLoaded', function() {
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
            // Сохраняем поисковый запрос в localStorage
            localStorage.setItem('searchQuery', query);
            // Перенаправляем на страницу результатов поиска
            window.location.href = 'search-results.html';
        }
    }
});
