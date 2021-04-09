var app = new Vue({
    el: '#root',
    data: {
        searchInput: '',
        searchDone: false,
        mainPath: 'https://image.tmdb.org/t/p/',
        posterWidth: 'w342',
        totalGenresList: {},
        flags: [
            'af',
            'ar',
            'be',
            'bg',
            'bs',
            'ca',
            'cs',
            'da',
            'de',
            'el',
            'en',
            'es',
            'fa',
            'fi',
            'fr',
            'he',
            'hi',
            'hr',
            'hu',
            'id',
            'is',
            'it',
            'ja',
            'kn',
            'ko',
            'ml',
            'nl',
            'no',
            'pa',
            'pl',
            'ps',
            'pt',
            'ro',
            'ru',
            'sk',
            'sl',
            'sq',
            'sr',
            'sv',
            'ta',
            'te',
            'th',
            'tr',
            'uk',
            'ur',
            'vi',
            'zh'
        ],
        useMovieFilter: false,
        useSeriesFilter: false,
        filmFilter: '',
        tvSeriesFilter: '',
        moviesArray: [],
        seriesArray: [],
        detailsReady: false,
        endIntro: false,
    },
    created() {
        axios
            .get('https://api.themoviedb.org/3/genre/movie/list?', {
                params: {
                    api_key: '02911b373bf1ff255f89a4eb00028d32',
                    language: 'it-IT'
                }
            })
            .then(function (result) {
                app.totalGenresList.movie = result.data.genres;
            })
        axios
            .get('https://api.themoviedb.org/3/genre/tv/list?', {
                params: {
                    api_key: '02911b373bf1ff255f89a4eb00028d32',
                    language: 'it-IT'
                }
            })
            .then(function (result) {
                app.totalGenresList.tvSeries = result.data.genres;
            })
        setTimeout(() => {
            app.endIntro = true;
        }, 4200);
    },
    methods: {
        searchMoviesAndSeries: function () {
            this.searchDone = true;
            this.detailsReady = false;
            if (this.searchInput.length >= 1) {
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
                        app.getDetails(app.moviesArray);
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
                        app.getDetails(app.seriesArray);
                    })
                this.searchInput = '';

            }
        },
        getDetails: function (array) {
            var movieOrTvSeries;
            if ('original_title' in array[0]) {
                movieOrTvSeries = 'movie';
            } else {
                movieOrTvSeries = 'tv';
            }
            setTimeout(() => {
                app.detailsReady = true;
            }, 500);
            array.forEach(element => {
                /* genres */
                axios
                    .get(`https://api.themoviedb.org/3/${movieOrTvSeries}/${element.id}?`, {
                        params: {
                            api_key: 'e99307154c6dfb0b4750f6603256716d',
                            language: 'it-IT'
                        }
                    })
                    .then(function (result) {
                        element.genres = result.data.genres;
                    })
                /* cast */
                axios
                    .get(`https://api.themoviedb.org/3/${movieOrTvSeries}/${element.id}/credits?`, {
                        params: {
                            api_key: 'e99307154c6dfb0b4750f6603256716d',
                            language: 'it-IT'
                        }
                    })
                    .then(function (result) {
                        element.cast = result.data.cast;
                    })
            })
        },
        showInfo: function (index) {
            let movie_tvSeries = document.getElementById(`${index}`);
            movie_tvSeries.querySelector('.ms_main_poster').classList.remove('active');
            movie_tvSeries.querySelector('.ms_infos').classList.add('active');
        },
        closeInfo: function (index) {
            let movie_tvSeries = document.getElementById(`${index}`);
            movie_tvSeries.querySelector('.ms_infos').classList.remove('active');
            movie_tvSeries.querySelector('.ms_main_poster').classList.add('active');
        },
        getPoster: function (poster) {
            return `${this.mainPath}${this.posterWidth}${poster}`
        },
        setFilmFilter: function () {
            let value = document.getElementById('filmPicker').value;
            if (value != 'All') {
                this.useMovieFilter = true;
                this.totalGenresList.movie.forEach((element) => {
                    if (element.id == value) {
                        this.filmFilter = element.id;
                    }
                })
            } else {
                this.useMovieFilter = false;
                this.filmFilter = '';
            }
        },
        setTvSeriesFilter: function () {
            let value = document.getElementById('tvSeriesPicker').value;
            if (value != 'All') {
                this.useSeriesFilter = true;
                this.totalGenresList.tvSeries.forEach((element) => {
                    if (element.id == value) {
                        this.tvSeriesFilter = element.id;
                    }
                })
            } else {
                this.useSeriesFilter = false;
                this.filmFilter = '';
            }
        }
    }
})