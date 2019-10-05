data = {
    projector:{
        1:'Проектировщик Вася',
        2:'Проектрировщик Петя',
        3:'Проектировщик Коля',
    },
    customer:{
        1:'Заказчик Вася',
        2:'Заказчик Петя',
        3:'Заказчик Вова',

    },
    facader:{
        1: 'Фасадчик Коля',
        2: 'Фасадчик Петя'
    },
    objects: {
        1: {
            facader: 1,
            projector:1,
            customer:1,
            coordinates: [55.6, 37.8]
        },
        2:
        {
            facader:1,
            projector:2,
            customer:2,
            coordinates: [55.7, 37.9]
        },
        3:
        {
            facader:1,
            projector:3,
            customer:3,
            coordinates: [55.8, 37.7]
        },
        4:
            {
                facader:2,
                projector:3,
                customer:3,
                coordinates: [55.7, 37.2]
            }
    }
};


$( document ).ready(function () {
    initFilter('#facader', data.facader);
    initFilter('#projector', data.projector);
    initFilter('#customer', data.customer);


    $('select').on('change', function(e){
        var filterSet = [];
        $('select').each(function (key, value) {
            //console.log(value.value,key,value.id);
            filterSet[value.id] = value.value;
        });
        //console.log(filterSet);
        activateObjects(filterSet);
    });
});

initFilter = function(id, values){
    $.each(values, function(key, value) {
        $(id).append($("<option value='"+key+"'>"+value+"</option>", {
            value: key,
            text: value
        }));
    });
};

activateObjects = function(filterSet){
    mineMap.geoObjects.removeAll();

    for(id in data.objects){
        //console.log(data.objects[id]);
         for (key in filterSet){
             if (data.objects[id][key] == filterSet[key])
                 setObjectOnMap(data.objects[id].coordinates)
         }
    }

}
setObjectOnMap = function(coordinates){
    var myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point", // тип геометрии - точка
            coordinates: coordinates // координаты точки
        }
    });
    mineMap.geoObjects.add(myGeoObject);
}