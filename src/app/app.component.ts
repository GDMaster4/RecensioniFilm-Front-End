import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = 'Front-End';

  premuto(event:Event)
  {
    const clicked= event.target as HTMLElement;
    clicked.style.textDecoration="underline";
    const links= document.getElementsByClassName("nav-link text-white");
    for (let i = 0; i < links.length; i++)
    {
      const link= links[i] as HTMLElement;
      if (link !== clicked) {
        link.style.textDecoration = "none"; // Aggiungi decorazione del testo
      }
    }
  }

  home()
  {
    const links= document.getElementsByClassName("nav-link text-white");
    for (let i = 0; i < links.length; i++)
    {
      const link= links[i] as HTMLElement;
      link.style.textDecoration = "none"; // Aggiungi decorazione del testo
    }
  }
}