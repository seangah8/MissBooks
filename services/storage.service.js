export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    isEntityExist,
}

// returns some kind of data from the local storage with 0.2 sec of delay
function query(entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [] // check if here i add the defaltes
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

// get specific item from the list in storage
function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

// save the new item into the beginning of the list in storage and return the item
function post(entityType, newEntity) {
    newEntity = {...newEntity}
    if(!newEntity.id) newEntity.id = _makeId()
    return query(entityType).then(entities => {
        entities.unshift(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

// replace item from the list in storage and return it back
function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        const entityToUpdate = {...entities[idx], ...updatedEntity}
        entities.splice(idx, 1, entityToUpdate)
        _save(entityType, entities)
        return updatedEntity
    })
}

// remove item from the list in storage
function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

function isEntityExist(entityType){
    return localStorage.getItem(entityType)? true : false
}

// Private functions

// save list in local storage
function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

// return random id
function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}