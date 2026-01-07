import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "#a-propos" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.gallery, href: "#galerie" },
    { label: t.nav.hours, href: "#horaires" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-2">Le Progrès</h3>
            <p className="text-background/70 text-sm mb-4">
              {t.footer.tagline}
            </p>
            <p className="text-background/60 text-sm">
              {t.footer.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif font-bold mb-4">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold mb-4">{t.contact.label}</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p>
                <a href="tel:+41787606979" className="hover:text-background transition-colors">
                  +41 78 760 69 79
                </a>
              </p>
              <p>
                <a href="mailto:contact@leprogres.ch" className="hover:text-background transition-colors">
                  contact@leprogres.ch
                </a>
              </p>
              <p className="text-background/60">
                Grand Rue 55<br />
                1904 Vernayaz, CH
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-sm text-background/60">
            © {new Date().getFullYear()} Le Progrès. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
