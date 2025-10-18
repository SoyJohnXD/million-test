export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {currentYear} John Londoño Test. All rights reserved.</p>
      </div>
    </footer>
  );
}
