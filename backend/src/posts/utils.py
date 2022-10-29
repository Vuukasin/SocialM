from django.core.files.images import get_image_dimensions


def calc_image_size(image):
    w, h = get_image_dimensions(image)
    proportion = w / h
    if proportion >= 1.1215:
        return 1
    elif proportion < 1.1215 and proportion >= 1.06075:
        return 2
    elif proportion < 1.06075 and proportion >= 0.93925:
        return 3
    elif proportion < 0.93925 and proportion  >= 0.8785 :
        return 4
    elif proportion < 0.8785 and proportion  >= 0.81775 :
        return 5
    elif proportion < 0.81775 and proportion  >= 0.757 :
        return 6
    elif proportion < 0.757 and proportion  >= 0.69625 :
        return 7
    elif proportion < 0.69625 and proportion  >= 0.6355 :
        return 8
    elif proportion < 0.6355 and proportion  >= 0.57475 : 
        return 9
    elif proportion < 0.57475 and proportion  >= 0.514:
        return 10
    else:
        return 11
    