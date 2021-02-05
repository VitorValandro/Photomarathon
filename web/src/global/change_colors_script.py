'''
  Esse é um script simples para trocar o nome das cores e suas variáveis em todos os arquivos CSS.
'''
import os

colors = {
  "--neutralGray": "rgb(139, 139, 139)",
  "--alertRed": "#e57878",
  "--neutralGreen": "#58af9b",
  "--lightGreen": "#78e5d5",
  "--alertOrange": "orange",
  "--white": "#FFF",
  "--lightGray": "#ecf0f1",
}

filepathsList = []
exclude = set(['node_modules', 'AuthScreen.css', 'global.css'])
for subdir, dirs, files in os.walk(r'C:\\Users\\vitor\\desktop\\prototype\\web'):
  dirs[:] = [d for d in dirs if d not in exclude]
  for filename in files:
    filepath = subdir + os.sep + filename

    if filepath.endswith(".css") and filename not in exclude:
      filepathsList.append(filepath)

for file in filepathsList:
  fin = open(file, 'r')
  data = fin.read()

  for key in colors:
    data = data.replace(colors[key], "var("+key+")")

  fin.close()

  fout = open(file, 'w')
  fout.write(data)
  fout.close()
