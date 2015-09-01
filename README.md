Practo-API  javascript client
------------------------------

A simple javascript client to talk to [practo-api](https://developers.practo.com/docs)


Installation
---

    npm i practo-api-client
 

To run-tests
----
    
    #Clone project
    git clone git@github.com:sahilsk/practo-api-client.git
    cd practo-api-client
    # install dependencies
    npm install 
    # install global dependencies for test runners
    npm install gulp  -g
    # Fire test
    npm test


How-to
----

#### Create new client

    var pClient = new Practo({
        host: "https://api.practo.com", //Default
        client_id: "<client id goes here",
        token:  "<practo client token goes here>"
    });

#### Ping practo-api

    pClient.ping( function(err, reply){
        if(err) throw  new Error(err);
        console.log(reply); // 'pong'
    });

Now you're ready to roll. 

eg.

    pClient.list_doctors( {page:1}, function(err, reply){
        if( error || reply.statusCode !== 200 ){
            throw new Error( reply.statusCode + ": " + reply.body);
        }else{
            //#do-great with doctors : reply.body['doctors'] 
        }
    }

> Read about api endpoints on practo website [here](https://developers.practo.com/docs#/reference/using-the-api). This client mimic the same.


APIs
---

`reply` object: 
- `statusCode`: http status code received from api-server
- `body`: server response body content


## Doctors Details

1. List all doctors

    `list_doctors( options, function(err, reply){...}`

    options:
    - `page(number)`: Offset of result to fetch in multiples of 20

2. Fetch doctor profile 

    `get_doctor(options, function(err, reply)) {...}`

    options:
    - `id(number)`: doctor id
    - with_relations(boolean=false):  Get all practices where doctor visits. 

---------

##  Practice Details

1. List All Practices

    `list_practices(option, function(err, reply){...})`
    
    options:
    - `page(number)`: Offset of result to fetch in multiples of 20

2. Fetch practice detail

    `get_practice( option, function(err, reply){...})`
    
    options: 
    - `id(number)`: doctor id
    - `with_doctors(boolean=false)`:  Get all practices where doctor visits. 
    
--------

## Search 

1. Search 

    `search( option,  function(err, reply){...})`
    
    options: 
    - `city(string)`: city eg. `bangalore`
    - `locality(string, null)`: Get all doctors who work in this locality. Should not be used when using near parameter.eg. `whitefield`. 
    - `searchfor(string, specialization)`:  Type of Search to perform. Search is performed for given specialty if value is `specialization`, for a doctor name if value is doctor or for a practice name if value is specified as `practice`.
    - `speciality(string, dentist)`: Specialization of doctors to search for.
    - q(string= null): With searchfor parameter set as doctor result returned are for doctor name containing q. With searchfor parameter set as practice, result returned are for practice name containing q.
    - `offset(number, 0)`: Offset of result to fetch in multiples of 10
    - near(string=null): Search for clinics near a given geographical coordinates. The coordinates need to be pair of latitude and longitude specified in Decimal Degrees(DD) seperated by a comma. Should not be used when using locality parameter.
    - `sort_by(string, practo_ranking)`: Sorts result by distance, years of experience, consultation fees or number of recommendations.
    -`filters(array)`: filters[qualification] - Filter results where doctor has given qualification. Ex. MDS, MD, MBBS ;
    
        - `filters[min_fee]` - Filter results where consultation fee is atleast the value provided. Ex. 100 ; filters[max_fee] - Filter results where consultation fee is atmost the value provided. Ex. 1000 ;
        - `filters[min_time]` - Filter results where doctor is available on or after given time on selected days. Value should be in 24 hours hh:mm format. Ex. '00:00' ;
        - `filters[max_time]` - Filter results where doctor is available before given time on selected days. Value should be in 24 hours hh:mm format. Ex. '23:30' ;
        - `filters[day][]` - Filter results availability of doctor on a given day. Set to any to search for all days or choose from day values monday, tuesday, wednesday, thursday, friday, saturday or sunday. This parameter can be overloaded i.e., used multiple times to specify set of days.

--------

## Search Meta

1. Cities

    `list_cities( function(err, reply){..})`

2. Localities & Specialties

    `get_city_report(option, function(err, reply){...})`
    
    option:
    - id(`number`): Id of city for which details are to be fetched.


License
------

MIT