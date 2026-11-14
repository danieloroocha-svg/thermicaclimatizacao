"""Local approved photo -> JPEG 1080x1350; no network, no AI services."""
import argparse
from PIL import Image, ImageOps, ImageDraw, ImageFont
p=argparse.ArgumentParser()
p.add_argument('photo'); p.add_argument('output'); p.add_argument('--title',required=True)
p.add_argument('--font',default='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
a=p.parse_args()
if len(a.title)>95: p.error('Título deve ter até 95 caracteres')
img=Image.new('RGB',(1080,1350),'white')
with Image.open(a.photo) as photo:
    img.paste(ImageOps.fit(ImageOps.exif_transpose(photo).convert('RGB'),(1080,900)),(0,0))
d=ImageDraw.Draw(img); font=ImageFont.truetype(a.font,42); small=ImageFont.truetype(a.font,28)
# Convert the default theme's OKLCH tokens from src/styles.css to sRGB.
import math, pathlib, re
css=(pathlib.Path(__file__).resolve().parent.parent/'src/styles.css').read_text()
def theme_rgb(name):
    match=re.search(r'--'+name+r':\s*oklch\(([^)]+)\)',css)
    L,C,H=map(float,match.group(1).split()); a=C*math.cos(math.radians(H)); b=C*math.sin(math.radians(H))
    l=(L+0.3963377774*a+0.2158037573*b)**3
    m=(L-0.1055613458*a-0.0638541728*b)**3
    s=(L-0.0894841775*a-1.291485548*b)**3
    rgb=(4.0767416621*l-3.3077115913*m+0.2309699292*s,-1.2684380046*l+2.6097574011*m-0.3413193965*s,-0.0041960863*l-0.7034186147*m+1.707614701*s)
    return tuple(round(255*max(0,min(1,12.92*c if c<=0.0031308 else 1.055*c**(1/2.4)-0.055))) for c in rgb)
d.rectangle((0,900,1080,1350),fill=theme_rgb('primary'))
d.rectangle((0,900,1080,914),fill=theme_rgb('accent'))
words=a.title.split(); lines=[]; line=''
for word in words:
    candidate=(line+' '+word).strip()
    if d.textlength(candidate,font=font)>960:
        lines.append(line); line=word
    else: line=candidate
lines.append(line)
if len(lines)>4: p.error('Título excede área disponível')
d.text((60,945),'THÉRMICA',font=font,fill='white')
for i,line in enumerate(lines): d.text((60,1010+i*52),line,font=font,fill='white')
d.text((60,1280),'thermicaclimatizacao.com.br',font=small,fill='white')
img.save(a.output,'JPEG',quality=90,optimize=True)
