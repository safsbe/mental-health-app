import json

temp = ""

with open("assets/markdown/know-your-personality.md", "r") as markdownFile:
  Lines = markdownFile.readlines()

  for line in Lines:
    temp += line

with open("assets/markdown/markdown-output.json", "w", encoding="utf-8") as jsonFile:
  json.dump(temp, jsonFile, ensure_ascii=False)
