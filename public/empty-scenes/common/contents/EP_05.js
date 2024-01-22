
dcl.subscribe('sceneStart')

function Vector3(x, y, z) {
  return { x, y, z }
}
function Quaternion(x, y, z, w) {
  return { x, y, z, w }
}
function Transform(transformData) {
  return transformData
}
function GLTFShape(url) {
  return { src: url }
}
const ids = {}
function normalEntityId(id) {
  if (!ids[id]) {
    ids[id] = (Object.keys(ids).length + 1).toString(10)
  }
  return ids[id]
}
function Entity(id) {
  this.id = normalEntityId(id)
  return this
}
Entity.prototype.setParent = function(parent) {
  dcl.setParent(this.id, parent.id)
}
Entity.prototype.addComponentOrReplace = function(component) {
  if (component.position && component.rotation && component.scale) {
    dcl.updateEntityComponent(this.id, 'engine.transform', 1, JSON.stringify(component))
  } else if (component.src) {
    dcl.componentCreated('gl_' + this.id, 'engine.shape', 54)
    dcl.componentUpdated('gl_' + this.id, JSON.stringify(component))
    dcl.attachEntityComponent(this.id, 'engine.shape', 'gl_' + this.id)
  }
}
var engine = {
  addEntity: function(entity) {
    dcl.addEntity(entity.id)
    if (entity.id === "1") {
      dcl.setParent(entity.id, "0")
    }
  }
}
