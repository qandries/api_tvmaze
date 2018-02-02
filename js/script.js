$(document).ready(function () {
    $('section button').on('click', function () {
        var contentName = document.querySelector('#TVShows').value;
        var searchContent = 'http://api.tvmaze.com/search/shows?q=';
        searchContent += contentName;
        var htmlRender = "";
        $.ajax({
            url: searchContent
        }).done(function (data) {
            htmlRender += "<ul>";
            $.each(data, function (index, value) {
                htmlRender += "<li data-url='" + value.show.name + "' >" + value.show.name + " (" + value.score + ")</li>";
            });
            htmlRender += "</ul>";
            $('[data-use="result"]').html(htmlRender);
        });
        $('body').on('click', '[data-use="result"] li', function () {
            var name = $(this).data('url');
            var show = "http://api.tvmaze.com/singlesearch/shows?q=";
            show += name;
            $.ajax({
                url: show
            }).done(function (data) {
                var htmlRenderBis = "";
                htmlRenderBis += "<button type='submit' name='Favorites'>Add to Favorites</button>";
                htmlRenderBis += "<ul>";
                $.each(data, function (index, value) {
                    if (index == 'id' || index == 'url' || index == 'webChannel' || index == 'externals' || index == 'updated' || index == '_links') {

                    } else if (index == 'image' && value != null) {
                        htmlRenderBis += "<li><img src='" + value.original + "'></li>";
                    } else if (index == 'schedule' && value != null) {
                        htmlRenderBis += "<li><h3>Schedule on </h3>" + value.time + " " + value.days[0] + "</li>";
                    } else if (index == 'rating' && value != null) {
                        htmlRenderBis += "<li><h3>Average Ratings : </h3>" + value.average + "</li>";
                    } else if (index == 'network' && value != null) {
                        htmlRenderBis += "<li><h3>Network : </h3>" + value.name + " (" + value.country.code + ")" + "</li>";
                    }else if (value == null){

                    }else if (index == 'name') {
                        htmlRenderBis += "<h2>" + value + "</h2>";
                    }else if (index == 'type') {
                        htmlRenderBis += "<li><h3>Type : </h3>" + value + "</li>";
                    }else if (index == 'language') {
                        htmlRenderBis += "<li><h3>Language : </h3>" + value + "</li>";
                    }else if (index == 'genres') {
                        htmlRenderBis += "<li><h3>Genres : </h3>" + value + "</li>";
                    }else if (index == 'status') {
                        htmlRenderBis += "<li><h3>Status : </h3>" + value + "</li>";
                    }else if (index == 'runtime') {
                        htmlRenderBis += "<li><h3>Runtime : </h3>" + value + "</li>";
                    }else if (index == 'premiered') {
                        htmlRenderBis += "<li><h3>Premiered on : </h3>" + value + "</li>";
                    }else if (index == 'officialSite') {
                        htmlRenderBis += "<li><h3>Official Site : </h3>" + value + "</li>";
                    }else if (index == 'weight') {
                        htmlRenderBis += "<li><h3>Number of episodes : </h3>" + value + "</li>";
                    }else if (index == 'summary') {
                        htmlRenderBis += "<li><h3>Summary : </h3><p>" + value + "</p></li>";
                    }
                    else {
                        htmlRenderBis += "<li>" + value + "</li>";
                    }
                });
                htmlRenderBis += "</ul>";
                $('[data-use="detail"]').html(htmlRenderBis);
                $('button').on('click', function () {
                    var fav = document.querySelector('section[data-use="detail"] ul h2').textContent;
                    var favKey = document.querySelector('section ul li').textContent;
                    localStorage.setItem(favKey, fav);
                })
            });
        });
    });
    $('main section[data-use="favorites"]').on('click', function () {
    })
});