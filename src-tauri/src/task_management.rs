use std::fs;
use std::io::Write;
use tauri::{command};

#[command]
pub fn write_task_to_file(json_task: String){
    let data = json_task + "\n";
    let mut f = fs::OpenOptions::new()
        .write(true)
        .append(true)
        .open("C:\\Users\\User\\Desktop\\temp.txt")
        .unwrap();
    f.write_all(data.as_bytes()).expect("Unable to write data");
} 