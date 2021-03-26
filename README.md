# Slapper
Slapper is an application that lets you battle Fighters against each other.

1. A List of Fighters can be found on the "Fighters" tab. You can adjust the characteristics of each Fighter or create new Fighters.
2. To simulate a battle, On the "Matches" tab, selecte 2 Fighters and pres the ATTACK button.
3. The battle results will appear in the Grid below the Fighters.
4. Each battle is idempotent, and can be run several times. (The Fighters health is reset for each battle.)

# Items of Interest
1. Initiative - set this value to the increased percent chance of the Fighter attacking first.
2. Critical - set this value to the percent chance of the Fighter causing Critical Damage on an attack.
3. Dodge - set this value to the percent chance of the Fighter causing the attacker to miss on an attack.

# History
The application keeps the fighting record of each Fighter along with the history of each match the Fighter has fought in.
You can view this history from the Fighters list by clicking on the "spyglass" icon on the right side of the list.

A few different technologies were used to build this application:
1. Angular 11 / Node.js.
2. DevExpress Angular Library.
3. Firebase FireStore.
4. Bootstrap 4.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
