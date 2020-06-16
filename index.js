d3.csv('./dataset_sleep.csv').then( data => {
    console.log(data[0]);    //prima linea csv
    console.log(data[0].sleep_log_entry_id); //campo del csv
    // console.log(data);
  });  