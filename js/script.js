var app = new Vue ({
    el: '#root',
    data: {
        searchInput: '',
        moviesArray: [],
        seriesArray: []
    },
    methods: {
        searchMoviesAndSeries: function() {
            axios
                .get('https://api.themoviedb.org/3/search/movie?api_key=02911b373bf1ff255f89a4eb00028d32', { 
                    params: {
                        query: app.searchInput,
                        language: 'it-IT'
                    } 
                })
                .then(function (result) {
                    app.moviesArray = result.data.results;
                    app.moviesArray.forEach(element => {
                        if(element.original_language == 'en') {
                            element.original_language = 'gb';
                        }
                        if (element.original_language == 'ja') {
                            element.original_language = 'jp';
                        }
                        if (element.original_language == 'ko') {
                            element.original_language = 'kr';
                        }
                    });
                })
            axios
                .get('https://api.themoviedb.org/3/search/tv?api_key=02911b373bf1ff255f89a4eb00028d32', {
                    params: {
                        query: app.searchInput,
                        language: 'it-IT'
                    }
                })
                .then(function (result) {
                    app.seriesArray = result.data.results;
                    app.seriesArray.forEach(element => {
                        if (element.original_language == 'en') {
                            element.original_language = 'gb';
                        }
                        if (element.original_language == 'ja') {
                            element.original_language = 'jp';
                        }
                        if (element.original_language == 'ko') {
                            element.original_language = 'kr';
                        }
                    });
                })
            this.searchInput = '';
        },
    }
})