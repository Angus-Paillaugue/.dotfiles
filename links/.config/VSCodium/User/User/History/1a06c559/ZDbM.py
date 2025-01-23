def extractProductId(url):
  url = sliceUrl(url)

  pathComponents = url.split('/')[-1].split('.')[0]
  productId = "-".join(pathComponents.split('-')[-2:])
  return productId


def sliceUrl(url):
  return url.split('?')[0]
