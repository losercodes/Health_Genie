use std::io::{self, Write};
use std::fs::File;
use std::io::prelude::*;

fn main() {
    let mut name = String::new();
    let mut email = String::new();
    let mut feedback = String::new();

    print_header();

    print!("Enter your name: ");
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut name).unwrap();

    print!("Enter your email: ");
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut email).unwrap();

    print!("Please provide your valuable feedback: ");
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut feedback).unwrap();

    print_divider();
    println!("\nThank you for your feedback, {}!\n", name.trim());
    print_user_info(&name, &email, &feedback);
    print_divider();

    save_feedback_to_file(&name, &email, &feedback);
}

// ... (other function definitions remain the same)

fn save_feedback_to_file(name: &str, email: &str, feedback: &str) {
    let mut file = File::create("feedback.txt").expect("Failed to create file");
    let feedback_data = format!("Name: {}\nEmail: {}\nFeedback: {}\n", name.trim(), email.trim(), feedback.trim());
    file.write_all(feedback_data.as_bytes()).expect("Failed to write to file");
    println!("\x1b[1;92mFeedback saved to feedback.txt\x1b[0m");
}
