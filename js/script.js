var app = new Vue ({
    el: '#root',
    data: {
        searchInput: '',
        mainPath: 'https://image.tmdb.org/t/p/',
        posterWidth: 'w342',
        moviesArray: [],
        seriesArray: []
    },
    methods: {
        searchMoviesAndSeries: function() {
            if(this.searchInput.length >= 1) {
                axios
                .get('https://api.themoviedb.org/3/search/movie?', { 
                    params: {
                        api_key: '02911b373bf1ff255f89a4eb00028d32',
                        query: app.searchInput,
                        language: 'it-IT'
                    } 
                })
                .then(function (result) {
                    app.moviesArray = result.data.results;
                    app.modifyLanguages(app.moviesArray);
                })
                axios
                .get('https://api.themoviedb.org/3/search/tv?', {
                    params: {
                        api_key: '02911b373bf1ff255f89a4eb00028d32',
                        query: app.searchInput,
                        language: 'it-IT'
                    }
                })
                .then(function (result) {
                    app.seriesArray = result.data.results;
                    app.modifyLanguages(app.seriesArray);
                })
                this.searchInput = '';
            }
        },
        showInfo: function(index) {
            let movie_tvSeries = document.getElementById(`${index}`);
            movie_tvSeries.querySelector('.ms_main_poster').classList.remove('active');
            movie_tvSeries.querySelector('.ms_infos').classList.add('active');
        },
        closeInfo: function(index) {
            let movie_tvSeries = document.getElementById(`${index}`);
            movie_tvSeries.querySelector('.ms_infos').classList.remove('active');
            movie_tvSeries.querySelector('.ms_main_poster').classList.add('active');
        },
        modifyLanguages: function(array) {
            array.forEach(element => {
                if (element.original_language == 'en') {
                    element.original_language = 'gb';
                }
                if (element.original_language == 'ja') {
                    element.original_language = 'jp';
                }
                if (element.original_language == 'ko') {
                    element.original_language = 'kr';
                }
            })
        }
    }
})