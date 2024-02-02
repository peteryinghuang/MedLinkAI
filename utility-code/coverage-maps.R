library("tidyverse")
library("maps")

world = map_data("world")
openai = readxl::read_excel("openai.xlsx")
google = readxl::read_excel("google.xlsx")

world = world %>%
  left_join(openai, by = join_by(region)) %>%
  left_join(google, by = join_by(region))

world$openai_value[is.na(world$openai_value)] = 0
world$google_value[is.na(world$google_value)] = 0
world$openai_and_google = world$openai_value + world$google_value

plain <- theme(
  axis.text = element_blank(),
  axis.line = element_blank(),
  axis.ticks = element_blank(),
  panel.border = element_blank(),
  panel.grid = element_blank(),
  axis.title = element_blank(),
  panel.background = element_rect(fill = "white"),
  plot.title = element_text(hjust = 0.5, size = 25),
  legend.text = element_text(size = 20),
  legend.title = element_text(size = 22),
  legend.key.size = unit(1, "in")
)

openai.coverage <- ggplot(data = world, mapping = aes(x = long, y = lat, group = group)) + 
  coord_fixed(1.3) +
  geom_polygon(aes(fill = as.factor(openai_value)), color = "white") +
  scale_fill_manual(values = c("lightgray", "#00A67E"), 
                    name = "Coverage\nStatus",
                    labels = c("Not covered", "Covered")) +
  ggtitle("OpenAI API Coverage Map") +
  plain

ggsave("openai_coverage.png",
       openai.coverage,
       width = 8640,
       height = 4860,
       units = "px")

google.coverage <- ggplot(data = world, mapping = aes(x = long, y = lat, group = group)) + 
  coord_fixed(1.3) +
  geom_polygon(aes(fill = as.factor(google_value)), color = "white") +
  scale_fill_manual(values = c("lightgray", "#4285F4"), 
                    name = "Coverage\nStatus",
                    labels = c("Not covered", "Covered")) +
  ggtitle("Google Generative AI API Coverage Map") +
  plain

ggsave("google_coverage.png",
       google.coverage,
       width = 8640,
       height = 4860,
       units = "px")

all.coverage <- ggplot(data = world, mapping = aes(x = long, y = lat, group = group)) + 
  coord_fixed(1.3) +
  geom_polygon(aes(fill = as.factor(openai_and_google)), color = "white") +
  scale_fill_manual(values = c("lightgray", "#00A67E", "#4285F4", "#FFD580"), 
                    name = "Coverage\nStatus",
                    labels = c("Not covered", 
                               "OpenAI\ncovered", 
                               "Google\ncovered",
                               "Both\ncovered")) +
  ggtitle("Google Generative AI and OpenAI API Coverage Map") +
  plain

ggsave("all_coverage.png",
       all.coverage,
       width = 8640,
       height = 4860,
       units = "px")
