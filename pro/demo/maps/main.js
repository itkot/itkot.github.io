//TODO Сделать обьект карты для работы с ним из вне с человеческой никапсуляцией

ymaps.ready(mapInit);
var mineMap;
function mapInit() {
    mineMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10
    });
// Создание геообъекта с типом точка (метка).
    var myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point", // тип геометрии - точка
            coordinates: [55.8, 37.8] // координаты точки
        }
    });

// // Размещение геообъекта на карте.
//     myMap.geoObjects.add(myGeoObject);
//
//
// //



}


