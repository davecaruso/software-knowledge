# grabs the database from the node cli and re-implements the search function
import os
import re
import random
import json

dir_path = os.path.dirname(os.path.realpath(__file__))

allArticles = None
allCategories = None
allEnds = None

def load(*folders):
  global allArticles
  global allCategories
  global allEnds
  data = json.loads(os.popen('node ' + dir_path + ' --load ' + ",".join(folders) + ' dump').read())
  allArticles = data['articles']
  allCategories = data['categories']
  allEnds = data['ends']

def filterArticles(filterString, array):
  if len(filterString) > 0:
    return list(filter(lambda x: filterString in str.strip(x), array))
  else:
    return array

def searchForArticle(query):
  if not query:
    query = '*'
  
  split = re.split(r'\s*\/\s*|\s+', query)
  search = split.pop()
  filterString = "/".join(split)

  if search in allEnds:
    ids = filterArticles(filterString, allEnds[search])
    if len(ids) == 1:
      return allArticles[ids[0]]
    else:
      return map(lambda id: allArticles[id], ids)
  else:
    if search in allCategories:
      return allArticles[random.choice(filterArticles(filterString, allCategories[search]))]
    else:
      return None
