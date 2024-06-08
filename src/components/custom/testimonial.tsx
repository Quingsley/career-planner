import { Avatar, AvatarFallback } from "../ui/avatar";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface Testimonial {
  name: string;
  testimonial: string;
  imageUrl: string;
  title: string;
}

const testimonialExample: Testimonial[] = [
  {
    name: "Steve Jobs",
    testimonial:
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle",
    imageUrl: "https://startupbros.com/wp-content/uploads/2013/07/steve-jobs.jpg",
    title: "Co-founder of Apple Inc",
  },
  {
    name: "George Elliot",
    testimonial: "It is never too late to be what you might have been",
    imageUrl:
      "https://www.thoughtco.com/thmb/feRbTmeaTUXsf94pVaPQ2r3H7p4=/275x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-96800347-fec7d0218d38443eb8005311bfa79094.jpg",
    title: "English novelist",
  },
  {
    name: "Maya Angelou",
    testimonial: "If you don't like something, change it. If you can't change it, change your attitude.",
    imageUrl: "https://img.freepik.com/premium-photo/maya-angelou-icon_889461-2161.jpg",
    title: "Poet and Civil Rights Activist",
  },
];

export function Testimonials() {
  return (
    <div className="mx-auto max-w-2xl py-12 md:py-16 lg:py-20">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What They Would Say</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400">Hear from the people who love our product.</p>
      </div>
      <div className="mt-10">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {" "}
            {testimonialExample.map(testimonial => (
              <CarouselItem key={testimonial.name}>
                <div className="flex flex-col items-center gap-6 p-6 md:flex-row md:gap-8">
                  <Avatar className="h-16 w-16 border">
                    <img src={testimonial.imageUrl} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{testimonial.title}.</p>
                    <p className="text-lg leading-relaxed">{testimonial.testimonial}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
