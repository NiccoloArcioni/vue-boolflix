var app = new Vue ({
    el: '#root',
    data: {
        searchInput: '',
        moviesArray: []
    },
    methods: {
        searchMovies: function() {
            axios
                .get('https://api.themoviedb.org/3/search/movie?api_key=02911b373bf1ff255f89a4eb00028d32', { 
                    params: {
                        query: app.searchInput,
                        language: 'it-IT'
                    } 
                })
                .then(function (result) {
                    app.moviesArray = result.data.results;
                })
            this.searchInput = '';
        }
    }
})