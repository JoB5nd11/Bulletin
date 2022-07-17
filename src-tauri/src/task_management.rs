use std::fs;
use std::io::Write;
use tauri::{command};

#[command]
pub fn add_task_to_file(){
    let data = "New Task\n";
    let mut f = fs::OpenOptions::new()
        .write(true)
        .append(true)
        .open("temp.txt")
        .unwrap();
    f.write_all(data.as_bytes()).expect("Unable to write data");
}