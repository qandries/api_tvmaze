$(document).ready(function () {
    $('section button').on('click', function () {
        var contentName = document.querySelector('#TVShows').value;
        var searchContent = 'https://api.tvmaze.com/search/shows?q=';
        searchContent += contentName;
        var htmlRender = "";
        $.ajax({
            url: searchContent
        }).done(function (data) {
            htmlRender += "<ul>";
            $.each(data, function (index, value) {
                htmlRender += "<li data-url='" + value.show.id + "' >" + value.show.name + "</li>";
            });
            htmlRender += "</ul>";
            $('[data-use="result"]').html(htmlRender);
        });
        $('body').on('click', '[data-use="result"] li', function () {
            var name = $(this).data('url');
            var show = "https://api.tvmaze.com/shows/";
            show += name;
            $.ajax({
                url: show
            }).done(function (data) {
                var htmlRenderBis = "";
                htmlRenderBis += "<button type='submit' name='Favorites'>Add to Favorites</button>";
                htmlRenderBis += "<div id='detail'>";
                if (data.image == null){
                    htmlRenderBis += "<img src='' alt='no pictures'>";
                }else if (data.image.original != null && data.image.original){
                    htmlRenderBis += "<img src='" + data.image.original + "'>";
                }else if (data.image.medium != null && data.image.medium) {
                    htmlRenderBis += "<img src='" + data.image.medium + "'>";
                }else {}
                htmlRenderBis += "<ul>";
                $.each(data, function (index, value) {
                    if (index == 'id' || index == 'url' || index == 'externals' || index == 'updated' || index == '_links' || index == 'image') {

                    } else if (index == 'schedule' && value != null) {
                        htmlRenderBis += "<li class='style'><h3>Schedule on </h3><span>" + value.time + " " + value.days[0] + "</span></li>";
                    } else if (index == 'rating' && value != null) {
                        htmlRenderBis += "<li class='style'><h3>Average Ratings : </h3><span>" + value.average + "</span></li>";
                    } else if (index == 'network' && value != null) {
                        htmlRenderBis += "<li class='style'><h3>Network : </h3><span>" + value.name + " (" + value.country.code + ")" + "</span></li>";
                    }else if (index == 'webChannel' && value != null) {
                        if (value.country != null) {
                            htmlRenderBis += "<li class='style'><h3>Web Channel : </h3><span>" + value.name + " (" + value.country.code + ")" + "</span></li>";
                        }else {
                            htmlRenderBis += "<li class='style'><h3>Web Channel : </h3><span>" + value.name + "</span></li>";
                        }
                    } else if (value == null){

                    }else if (index == 'name') {
                        htmlRenderBis += "<h2>" + value + "</h2>";
                    }else if (index == 'type') {
                        htmlRenderBis += "<li class='style'><h3>Type : </h3><span>" + value + "</span></li>";
                    }else if (index == 'language') {
                        htmlRenderBis += "<li class='style'><h3>Language : </h3><span>" + value + "</span></li>";
                    }else if (index == 'genres') {
                        htmlRenderBis += "<li class='style'><h3>Genres : </h3><span>" + value + "</span></li>";
                    }else if (index == 'status') {
                        htmlRenderBis += "<li class='style'><h3>Status : </h3><span>" + value + "</span></li>";
                    }else if (index == 'runtime') {
                        htmlRenderBis += "<li class='style'><h3>Runtime (in minutes): </h3><span>" + value + "</span></li>";
                    }else if (index == 'premiered') {
                        htmlRenderBis += "<li class='style'><h3>Premiered on : </h3><span>" + value + "</span></li>";
                    }else if (index == 'officialSite') {
                        htmlRenderBis += "<li class='style'><h3>Official Site : </h3><span>" + value + "</span></li>";
                    }else if (index == 'weight') {
                        htmlRenderBis += "<li class='style'><h3>Number of episodes : </h3><span>" + value + "</span></li>";
                    }else if (index == 'summary' && value != null) {
                        htmlRenderBis += "<li><h3>Summary : </h3><p>" + value + "</p></li>";
                    }
                    else {
                        htmlRenderBis += "<li class='style'><span>" + value + "</li>";
                    }
                });
                htmlRenderBis += "</ul>";
                htmlRenderBis += "</div>";
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
