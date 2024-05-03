// atoms- The smallest possible components, such as buttons, titles, inputs or event color pallets, animations, and fonts can be stored in the atoms folder.

// Button.js
function Button({ label, onClick }) {
    return <button onClick={onClick}>{label}</button>;
  }
  