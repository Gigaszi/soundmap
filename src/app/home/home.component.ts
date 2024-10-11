import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeTextArray: string[] =
  [
    "<p>Was ist eine soundmap?<br></p>",
    "<p>Eine soundmap ist eine akustische Landkarte oder ein akustischer Stadtplan eines Ortes. “Heidelberg Hören” bietet Ihnen die Möglichkeit, die Stadt Heidelberg mit den Ohren zu erkunden und zu entdecken; statt Sehenswürdigkeiten finden Sie hier Hörenswürdigkeiten, die unterschiedlichste klangliche Facetten der Stadt zeigen.<br></p>",
    "<p>Wie ist die Soundmap aufgebaut?<br></p>",
    "<p>Über den Stadtplan verteilt finden Sie kleine Markierungen /flags. Wenn Sie eine davon anclicken, sehen Sie ein kleines Bild des jeweiligen Ortes, einen kurzen Text dazu und einen weiteren “button” zum Klangbild des Ortes – durch erneutes anclicken öffnet sich eine Audiodatei mit dem Klang des Ortes.<br></p>",
    "<p>Die Orte sind in drei Kategorien unterteilt, die sich in den Farben der flags unterscheiden:<br></p>",
    "<p>1. Öffentliche Orte (rot): hier hören Sie beispielsweise, wie es auf dem Heidelberger Schloss klingt, welches Stimmen- und Sprachengewirr man in der langen Fußgängerzone hört, die Stille-Oase im Hof des Kurpfälzischen Museums, das Rumpeln der historischen Bergbahn und die klangliche Begegnung der Kulturen auf der Neckarwiese. Oder Sie Sie belauschen die Scharen von Krähen und Halsbandsittichen auf ihren Schlafbäumen.<br></p>",
    "<p>2. Veranstaltungen im Freien (grün): Hier können Sie akustisch spazieren gehen auf Festen, Märkten, zum Feuerwerk der Heidelberger Schlossbeleuchtung oder zu Sportereignissen<br></p>",
    "<p>3. “verborgene Klänge” (blau): diese Klänge muss man erst suchen; Sie können hier akustische Ausflüge unternehmen in kleine Werkstätten, unter die Erde, in einen Bienenkorb – oder auch einfach eine Straßenbahnfahrt unternehmen.<br></p>",
    "<p>Wir empfehlen, die Aufnahmen mit Stereo-Kopfhörern guter Qualität zu hören, da sie allesamt mit guter Aufnahmetechnik erstellt wurden und z.T. (durch sog. binaurale Aufnahmetechnik) ein sehr reales, räumliches Klangbild haben, das aber nur mit Kopfhörern erfahren werden kann<br></p>",
    "<p>Idee, Texte und Aufnahmen: Axel Mecke<br></p>",
    "<p>Aufnahmeassistenz: Luise Kieckhöfel<br></p>",
    "<p>Webdesign und Programmierung: Levi Szamek<br></p>",
    "<p>Weitere Informationen zum Hintergrund der soundmap und zur verwendeten Aufnahmetechnik finden Sie im Menü.<br></p>",
    "<p>Und schließlich: vermissen Sie den Klang eines besonderen Ortes? Haben Sie Anregungen für weitere Hörenswürdigkeiten? Dann schreiben Sie mir: axel.mecke&#64;t&#45;online.de . Diese Seite wird fortlaufend weiter entwickelt.<br></p>",
    "<p>Welcome to the sound map \"Listening to Heidelberg\"<br></p>",
    "<p>Please read this brief introduction before you first visit the sound map!<br></p>",
    "<p>What is a sound map?<br></p>",
    "<p>A sound map is an acoustic map or an acoustic city plan of a location. \"Listening to Heidelberg\" offers you the opportunity to explore and discover the city of Heidelberg with your ears. Instead of visual impressions, you will find acoustic sites that are worth hearing, showcasing various auditory facets of the city.<br></p>",
    "<p>How is the sound map structured?<br></p>",
    "<p>Distributed across the city map, you will find small markers/flags. When you click on one of them, you will see a small picture of the respective location, a brief text about it, and another button for the characteristic sound of the place - clicking again will open an audio file with the sound of the location.<br></p>",
    "<p>The locations are divided into three categories, distinguished by the colors of the flags:<br></p>",
    "<p>1. Public places (red): Here you can hear, for example, the soundscape of the Heidelberg Castle, the blend of voices and languages one hears in the long pedestrian zone, the quiet oasis in the courtyard of the “Kurpfälzische Museum”, the rumble of the historic “Bergbahn” and the auditory encounter of cultures on the Neckar meadow. Or you can eavesdrop on the flocks of crows and ring-necked parakeets on their roosting trees.<br></p>",
    "<p>2. Outdoor events (green): Here you can take an acoustic stroll at festivals, markets, at the fireworks of the Heidelberg Castle illumination, or at sports events.<br></p>",
    "<p>3. \"Hidden sounds\" (blue): These sounds must be sought out; you can take acoustic excursions here to small workshops, under the ground, into a beehive – or simply take a tram ride.<br></p>",
    "<p>We recommend listening to the recordings with high-quality stereo headphones. They were all created with good recording technology and partly (using so-called binaural recording technology) have a very realistic, spatial sound image that can only be experienced with headphones.<br></p>",
    "<p>Idea, texts and recordings: Axel Mecke<br></p>",
    "<p>Recording assistence: Luise Kieckhöfel<br></p>",
    "<p>Webdesign and programming of the sight: Levi Szamek<br></p>",
    "<p>For more information on the background of the soundmap and the recording techniques used, please see the menu.<br></p>",
    "<p>And finally: Do you miss the sound of a special place? Do you have suggestions for more acoustic sites worth listening to? Then please contact me: axel.mecke&#64;t	&#45;online.de. This page will continue to be developed.<br></p>",
];

scrollToBottom() {
  console.log("here")
  const currentDiv = document.querySelector('scroll-container') as HTMLElement;
  currentDiv.scrollTop = currentDiv.scrollHeight;

}
  constructor(private router: Router, private translate: TranslateService) {
    // Set the default language if necessary
    this.translate.setDefaultLang('de'); // Set default language to German

    // Fetch the translations for the current language
    this.translate.get('home').subscribe((translations: any) => {
      this.homeTextArray = translations.texts; // Assuming your translation keys match the structure
    });
  }

  redirectToAnotherPage() {
    // Navigate to another page when the button is clicked
    this.router.navigateByUrl('/soundmap');
  }
}

