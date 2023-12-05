/** @format */

function addEventListener(el, eventName, eventHandler, selector) {
    if (selector) {
        const wrappedHandler = (e) => {
            if (!e.target) return;
            const el = e.target.closest(selector);
            if (el) {
                eventHandler.call(el, e);
            }
        };
        el.addEventListener(eventName, wrappedHandler);
        return wrappedHandler;
    } else {
        const wrappedHandler = (e) => {
            eventHandler.call(el, e);
        };
        el.addEventListener(eventName, wrappedHandler);
        return wrappedHandler;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("section button").addEventListener("click", function () {
        const contentName = document.querySelector("#TVShows").value;
        let searchContent = "https://api.tvmaze.com/search/shows?q=";
        searchContent += contentName;
        let htmlRender = "";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", searchContent, true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                htmlRender += "<ul>";
                data.forEach(function (value) {
                    htmlRender +=
                        "<li data-url='" + value.show.id + "' >" + value.show.name + "</li>";
                });
                htmlRender += "</ul>";
                document.querySelector('[data-use="result"]').innerHTML = htmlRender;
            }
        };
        xhr.send();

        addEventListener(
            document.querySelector("body"),
            "click",
            function (e) {
                const name = e.target.getAttribute("data-url");
                const show = "https://api.tvmaze.com/shows/" + name;
                let xhrShow = new XMLHttpRequest();
                xhrShow.open("GET", show, true);
                xhrShow.onload = function () {
                    if (xhrShow.status == 200) {
                        const data = JSON.parse(xhrShow.responseText);

                        let htmlRenderBis = "";
                        htmlRenderBis +=
                            "<button type='submit' name='Favorites'>Add to Favorites</button>";
                        htmlRenderBis += "<div id='detail'>";
                        if (data.image == null) {
                            htmlRenderBis += "<img src='' alt='no pictures'>";
                        } else if (data.image.original != null && data.image.original) {
                            htmlRenderBis += "<img src='" + data.image.original + "'>";
                        } else if (data.image.medium != null && data.image.medium) {
                            htmlRenderBis += "<img src='" + data.image.medium + "'>";
                        }
                        htmlRenderBis += "<ul>";
                        const bidule = Object.keys(data);
                        bidule.forEach((tvShow) => {
                            if (data[tvShow] == null) {
                            } else {
                                switch (tvShow) {
                                    case "id":
                                    case "url":
                                    case "externals":
                                    case "updated":
                                    case "_links":
                                    case "image":
                                        break;
                                    case "schedule":
                                        if (
                                            data[tvShow] &&
                                            ((data[tvShow].time && data[tvShow].time.length > 0) ||
                                                (data[tvShow].days && data[tvShow].days.length > 0))
                                        ) {
                                            htmlRenderBis +=
                                                "<li class='style'><h3>Schedule on </h3><span>" +
                                                (data[tvShow].time ?? "") +
                                                " " +
                                                (data[tvShow].days[0] ?? "") +
                                                "</span></li>";
                                        }
                                        break;
                                    case "rating":
                                        if (data[tvShow].average) {
                                            htmlRenderBis +=
                                                "<li class='style'><h3>Average Ratings : </h3><span>" +
                                                data[tvShow].average +
                                                "</span></li>";
                                        }
                                        break;
                                    case "network":
                                        if (data[tvShow]) {
                                            htmlRenderBis +=
                                                "<li class='style'><h3>Network : </h3><span>" +
                                                data[tvShow].name +
                                                " (" +
                                                data[tvShow].country.code +
                                                ")" +
                                                "</span></li>";
                                        }
                                        break;
                                    case "webChannel":
                                        if (data[tvShow]) {
                                            if (data[tvShow].country) {
                                                htmlRenderBis +=
                                                    "<li class='style'><h3>Web Channel : </h3><a href='" +
                                                    data[tvShow].officialSite +
                                                    "' ><span>" +
                                                    data[tvShow].name +
                                                    " (" +
                                                    data[tvShow].country.code +
                                                    ")" +
                                                    "</span></a></li>";
                                            } else {
                                                htmlRenderBis +=
                                                    "<li class='style'><h3>Web Channel : </h3><a href='" +
                                                    data[tvShow].officialSite +
                                                    "' ><span>" +
                                                    data[tvShow].name +
                                                    "</span></a></li>";
                                            }
                                        }
                                        break;
                                    case "name":
                                        htmlRenderBis += "<h2>" + data[tvShow] + "</h2>";
                                        break;
                                    case "type":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Type : </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "language":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Language : </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "genres":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Genres : </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "status":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Status : </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "runtime":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Runtime (in minutes): </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "averageRuntime":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Average Runtime (in minutes): </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "premiered":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Premiered on : </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "ended":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Ended on : </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "officialSite":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Official Site : </h3><span><a href='" +
                                            data[tvShow] +
                                            "'>" +
                                            data[tvShow] +
                                            "</a></span></li>";
                                        break;
                                    case "weight":
                                        htmlRenderBis +=
                                            "<li class='style'><h3>Number of episodes : </h3><span>" +
                                            data[tvShow] +
                                            "</span></li>";
                                        break;
                                    case "summary":
                                        htmlRenderBis +=
                                            "<li><h3>Summary : </h3><p>" +
                                            data[tvShow] +
                                            "</p></li>";
                                        break;

                                    default:
                                        htmlRenderBis +=
                                            "<li class='style'><h3>" +
                                            tvShow +
                                            " : </h3><span>" +
                                            data[tvShow] +
                                            "</li>";
                                        break;
                                }
                            }
                        });
                        htmlRenderBis += "</ul>";
                        htmlRenderBis += "</div>";
                        document.querySelector('[data-use="detail"]').innerHTML = htmlRenderBis;

                        document.querySelector("button").addEventListener("click", function () {
                            const fav = document.querySelector(
                                'section[data-use="detail"] ul h2'
                            ).textContent;
                            const favKey = document.querySelector("section ul li").textContent;
                            localStorage.setItem(favKey, fav);
                        });
                    }
                };
                xhrShow.send();
            },
            "[data-use=result] li"
        );

        // document.body.addEventListener("click");
    });
    document.querySelector('main section[data-use="favorites"]').addEventListener("click", () => {
        // Your code for handling favorites section click goes here
    });
});
