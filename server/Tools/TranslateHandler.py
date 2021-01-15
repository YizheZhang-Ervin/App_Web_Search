from translate import Translator
            
def run(sentence,fromlang="english",tolang="chinese"):
    translator_ec = Translator(from_lang=fromlang, to_lang=tolang)
    translatedSentence = translator_ec.translate(sentence)
    return translatedSentence