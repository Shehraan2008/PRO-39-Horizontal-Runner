class Form {
  constructor() {
    this.title = createElement("h1");
    this.greeting = createElement("h2");
    this.body = createElement("p");
    this.button = createButton("START!");
    this.button.addClass("nes-btn is-warning");
  }

  hide() {
    this.title.hide();
    this.greeting.hide();
    this.body.hide();
    this.button.hide();
  }

  display() {
    // The Content
    this.title.html("Space Shooter Redux");
    this.greeting.html("Welcome to Space Shooter Redux!");
    this.body.html(
      "The Wormhole opened, illuminating the stained shuttle. Nothing could be seen miles away. A Small, shiny space shuttle with with strainght black decals turned the corner, with a A5-WAGYU drone one one side. reloading a sonic blaster on the other side. The polished exterior, embeded with steller engine functing in the last rays of humanity, contrasted signifinatly with the grim soroundings. it took a swift turn towards the wormhole. Corspses dangled from crooked leftovers of the ship taking up most of the attention, mounds of debris littered the once glorius Leaders of the world. Seeing this you jump into the wormhole and end up in a truly new location"
    );
    // The Positioning.
    this.title.position(width / 2 - 450, height / 5 - 100);
    this.greeting.position(width / 2 - 370, height / 4 - 50);
    this.body.position(width / 2 - 390, height / 2 - 130);
    this.button.position(width / 2 - 90, height / 1.25 + 20);

    this.button.mousePressed(() => {
      form.hide();
      gameState = "play";
    });
  }
}
