import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+41 78 760 69 79",
      href: "tel:+41787606979",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "contact@leprogres.ch",
      href: "mailto:contact@leprogres.ch",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: "Grand Rue 55, 1904 Vernayaz, CH",
      href: "https://maps.google.com/?q=Grand+Rue+55,1904+Vernayaz,CH",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">
            {t.contact.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">
            {t.contact.title1}
            <br />
            <span className="text-primary">{t.contact.title2}</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={i}
                  href={info.href}
                  target={info.label === t.contact.address ? "_blank" : undefined}
                  rel={info.label === t.contact.address ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:shadow-soft hover:border-primary/50 transition-all group"
                >
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-foreground">
                      {info.label}
                    </h3>
                    <p className="text-foreground/70 mt-1">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
              >
                <a href="tel:+41787606979">
                  <Phone className="mr-2 h-5 w-5" />
                  {t.contact.callNow}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <a href="mailto:contact@leprogres.ch">
                  <Mail className="mr-2 h-5 w-5" />
                  {t.contact.sendEmail || "Email"}
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-medium border border-border h-full min-h-[400px]"
          >
            <iframe
              width="100%"
              height="100%"
              style={{ minHeight: "400px", border: "none" }}
              loading="lazy"
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2756.156832652294!2d7.039869!3d46.134122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479235f39b6b6b6b%3A0x1234567890abcdef!2sGrand%20Rue%2055%2C%201904%20Vernayaz!5e0!3m2!1sfr!2sch!4v1234567890"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
