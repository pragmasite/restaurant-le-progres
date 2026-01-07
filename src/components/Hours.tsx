import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Hours = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const schedule = [
    { hours: "11:30 - 14:00, 18:00 - 22:30" }, // Monday
    { hours: "11:30 - 14:00, 18:00 - 22:30" }, // Tuesday
    { hours: "11:30 - 14:00, 18:00 - 22:30" }, // Wednesday
    { hours: "11:30 - 14:00, 18:00 - 22:30" }, // Thursday
    { hours: "11:30 - 14:00, 18:00 - 23:00" }, // Friday
    { hours: "12:00 - 14:00, 18:00 - 23:00" }, // Saturday
    { hours: t.hours.closed }, // Sunday
  ];

  const todayIndex = new Date().getDay();
  const adjustedTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1; // Convert Sunday(0) to index 6

  return (
    <section id="horaires" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">
            {t.hours.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4">
            {t.hours.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-xl rounded-2xl border border-border bg-background shadow-soft overflow-hidden"
        >
          <div className="flex items-center gap-3 border-b bg-primary/5 px-6 py-4">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg font-bold text-foreground">{t.hours.header}</span>
          </div>
          <div className="divide-y">
            {schedule.map((item, i) => {
              const isToday = i === adjustedTodayIndex;
              const isClosed = item.hours === t.hours.closed;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className={`px-6 py-4 flex justify-between items-center transition-colors ${
                    isToday ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isToday && <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />}
                    <div>
                      <span className={`text-sm font-medium ${isToday ? "text-primary font-bold" : "text-foreground"}`}>
                        {(t.hours.days as string[])[i]}
                      </span>
                      {isToday && (
                        <span className="ml-2 inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                          {t.hours.today}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`text-sm ${isClosed ? "text-muted-foreground font-medium" : "text-foreground font-medium"}`}>
                    {item.hours}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hours;
