#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod task_management;

fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    //.menu(tauri::Menu::os_default(&context.package_info().name))
    .invoke_handler(tauri::generate_handler![
      task_management::write_task_to_file
    ])
    .run(context)
    .expect("error while running tauri application");
}
