#include <SFML/Graphics.hpp>
#include <iostream>
#include <string>

using namespace std;

int main() {
    string name, email, feedback;

    // Get user name
    cout << "Enter your name: ";
    getline(cin, name);

    // Get user email
    cout << "Enter your email: ";
    getline(cin, email);

    // Get user feedback
    cout << "Enter your feedback: ";
    getline(cin, feedback);

    // Create the window
    sf::RenderWindow window(sf::VideoMode(800, 600), "User Information");

    // Create the text objects
    sf::Font font;
    if (!font.loadFromFile("path/to/font.ttf")) {
        cout << "Failed to load font" << endl;
        return 1;
    }

    sf::Text nameText(name, font, 24);
    sf::Text emailText("Email: " + email, font, 24);
    sf::Text feedbackText("Feedback: " + feedback, font, 24);

    nameText.setPosition(10, 10);
    emailText.setPosition(10, 50);
    feedbackText.setPosition(10, 90);

    // Main loop
    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed) {
                window.close();
            }
        }

        window.clear();
        window.draw(nameText);
        window.draw(emailText);
        window.draw(feedbackText);
        window.display();
    }

    return 0;
}
