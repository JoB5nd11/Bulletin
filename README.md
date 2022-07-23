🛑 <span style="color:red">This project is under heavy development and has next to no features at this point!</span> 🛑

<br>

# Bulletin
Bulletin will be a time management application. The goal is to simply insert appointments, projects and deadlines and bulletin will autmatically create a schedule based on your preferences.

*Bulletin* is heavily inspired by the planner software [Reclaim](https://reclaim.ai/features/planner).

This application is being build using [Tauri](https://tauri.app) and Vanilla Javascript and is still in development.

<br>

---

# Installation

For now there are no official releases. \
If you want to get a `.exe` file, run the project with
```
npm run tauri dev
```
with NodeJS installed. \
Then go to the folder `src-taur\target\debug\`. The executable should be here.

<br>

---

# How to Use

Currently the application has next to no functionality. Also the UI Design is very barebone:
<center>
    <img src="src-tauri\readme_assets\Home.png" width="60%">
</center>

<br>

It is possible to create two types of Task:
- **Fixed Task** with a specified start and end date. These are meant for fixed appointments.
- **Unfixed Task** with only a given deadline. Bulletin will split these ones up into multiple schedule points.

<center>
    <img src="src-tauri\readme_assets\newtask.png" width="40%">
</center>

---

At any time, you can [buy me a coffe](https://www.buymeacoffee.com/b5nd11) 🤎