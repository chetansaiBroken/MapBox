import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { DoubleClickZoomHandler } from 'mapbox-gl';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hldGFuMTIiLCJhIjoiY2t4YTNzdnJhMGRydDMxbXdtaDhlcHMzciJ9._D9eX_eT5rvmusWLdC5V6w';

function Map() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [display, setDisplay] = useState(true);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [description, setDescription] = useState('');
   // const [name, setName] = useState('');
    const [type, setType] = useState(0);
    const [allow, setAllow] = useState(0);
    const [features1, setFeatures1] = useState([])
    const [features2, setFeatures2] = useState([])
    const [features3, setFeatures3] = useState([])
    const [features0, setFeatures0] = useState([])

    const place_data0 = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: []
        }
    }
    const place_data1 = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: []
        }
    }
    const place_data2 = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: []
        }
    }
    const place_data3 = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: []
        }
    }

    const place_layer0 = {
        id: 'places0',
        type: 'circle',
        source: 'places0',
        paint: {
            'circle-color': '#fff000',
            'circle-radius': 10,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000000'
        }
    }
    const place_layer1 = {
        id: 'places1',
        type: 'circle',
        source: 'places1',
        paint: {
            'circle-color': '#ff0000',
            'circle-radius': 10,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000000'
        }
    }



    const place_layer2 = {
        'id': 'places2',
        'type': 'circle',
        'source': 'places2',
        'paint': {
            'circle-color': '#00ff00',
            'circle-radius': 10,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000000'
        }
    }


    const place_layer3 = {
        'id': 'places3',
        'type': 'circle',
        'source': 'places3',
        'paint': {
            'circle-color': '#0000ff',
            'circle-radius': 10,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#000000'
        }
    }


    useEffect(() => {

        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [80, 23],
            zoom: 5,
        });

        map.current.on('load', () => {

            // map.current.addSource(
            //     'nationalPark', {
            //     'type': 'geojson',
            //     'data': {
            //         'type': 'FeatureCollection',
            //         //'properties': { 'id': 1 },
            //         'features': [{
            //             'type': 'Feature',
            //             'geometry': {
            //                 'type': 'Point',
            //                 'coordinates': [80, 23]
            //             }
            //         }]
            //     }
            // }
            // );


            map.current.addSource('places0', place_data0);
            map.current.addSource('places1', place_data1);
            map.current.addSource('places2', place_data2);
            map.current.addSource('places3', place_data3);
            map.current.addLayer(place_layer0);
            map.current.addLayer(place_layer1);
            map.current.addLayer(place_layer2);
            map.current.addLayer(place_layer3);

          
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });


            let layers = ['places0', 'places1', 'places2', 'places3']
            for (let i = 0; i < 4; i++) {
                map.current.on('mouseenter', layers[i], (e) => {
                    console.log("mouseentered:");
                    // Change the cursor style as a UI indicator.
                    map.current.getCanvas().style.cursor = 'pointer';

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const description = e.features[0].properties.description;

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
                });

                map.current.on('mouseleave', layers[i], () => {
                    map.current.getCanvas().style.cursor = '';
                    popup.remove();
                });
            }
       
        });  

    })

   

    function map_popup0(feat) {
        let source = map.current.getSource("places0");
        // place_data1.data.features.push({
        //     'type': 'Feature',
        //     // 'properties': {
        //     //     'description': desc_json,
        //     // },
        //     'geometry': {
        //         'type': 'Point',
        //         'coordinates': [lng, lat]
        //     }
        // });        
       
        place_data0.data.features.push(feat);
        source.setData(place_data0.data)

    };

    function map_popup1(feat) {
        let source = map.current.getSource("places1");
        place_data1.data.features.push(feat);
        source.setData(place_data1.data)
    };

    function map_popup2(feat) {
        let source = map.current.getSource("places2");
        place_data2.data.features.push(feat);
        source.setData(place_data2.data)
    };

    function map_popup3(feat) {
        let source = map.current.getSource("places3");
        place_data3.data.features.push(feat);
        source.setData(place_data3.data)
    };

    function changedisplay(e) {
        if (e.keyCode === 191) {
            e.preventDefault();
            setDisplay(!display)
        }
    }

   
    useEffect(() => {
        window.addEventListener('keydown', changedisplay)
        return (
            window.addEventListener('keydown', changedisplay)
        )
    })

    const clickHandler = () => {
        console.log("buttonclicked");
       let  desc_json = "<p>" + description + "</p>";
 
        if(type == 0){
            setFeatures0([...features0, {
                'type': 'Feature',
                'properties': {
                    'description': desc_json,
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [longitude, latitude]
                }
            }] )
        }
        else if(type == 1){
            setFeatures1([...features1, {
                'type': 'Feature',
                'properties': {
                    'description': desc_json,
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [longitude, latitude]
                }
            }] )
        }
          
       else if(type == 2){
            setFeatures2([...features2, {
                'type': 'Feature',
                'properties': {
                    'description': desc_json,
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [longitude, latitude]
                }
            }] )
        }
        else {
            setFeatures3([...features3, {
                'type': 'Feature',
                'properties': {
                    'description': desc_json,
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [longitude, latitude]
                }
            }] )
        }
        setAllow(1);    
    }


    useEffect(() => {
        if (allow == 1) {
            console.log("entered");
            console.log("type:", type)
            console.log(features1);
            if(type == 0){
                for(let i=0; i<features0.length; i++){      
                map_popup0(features0[i]);
                }
            }
            else if(type == 1){
                for(let i=0; i<features1.length; i++){      
                map_popup1(features1[i]);
                }
            }
            else if(type == 2){
                for(let i=0; i<features2.length; i++){      
                map_popup2(features2[i]);
                }
            }
            else{
                for(let i=0; i<features3.length; i++){      
                map_popup3(features3[i]);
                }
            }
            console.log("inside_mappopup:",place_data1.data.features);  
            console.log("place data:", place_data1);
            setDisplay(!display)
            setAllow(0)
        }

    })

    

    console.log('current allow value is::', allow);
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
            <div className='inputform' style={{ display: display ? 'inline-block' : 'none' }}>


                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Longitude</InputGroup.Text>
                    <FormControl onChange={event => {setLongitude(event.target.value)}}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Latitude</InputGroup.Text>
                    <FormControl onChange={event => {setLatitude( event.target.value)}}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Description</InputGroup.Text>
                    <FormControl onChange={event => setDescription(event.target.value)}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>

                {/* <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                    <FormControl onChange={event => setName(event.target.value)}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup> */}

                <Col xs="auto" className="my-1">
                    <Form.Label
                        className="me-sm-2"
                        htmlFor="inlineFormCustomSelect"
                        visuallyHidden
                    >
                        Preference
                    </Form.Label>
                    <Form.Select className="me-sm-2" id="inlineFormCustomSelect" onChange = {event => setType(event.target.value)}>
                        <option value="0">BLE</option>
                        <option value="1">WiFi</option>
                        <option value="2">Cell_LTE</option>
                        <option value="3">Cell_GSM</option>
                    </Form.Select>
                </Col>
                <Button variant="outline-success" onClick={e => clickHandler()}>Submit {allow}</Button>
            </div>
        </div>
    );
}

export default Map