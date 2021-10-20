QBCore = nil

local charPed = nil

Citizen.CreateThread(function() 
    while true do
        Citizen.Wait(10)
        if QBCore == nil then
            TriggerEvent("QBCore:GetObject", function(obj) QBCore = obj end)    
            Citizen.Wait(200)
        end
    end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		if NetworkIsSessionStarted() then
			TriggerEvent('qb-multicharacter:client:chooseChar')
			return
		end
	end
end)

local muteSound = true

-- -76.25 -814.86 243.39 250.67
-- -80.43 -813.71 243.39 250.67 -76.84,-814.75,243.39
Config = {
    PedCoords = {x = -1451.05, y = -554.69, z = 72.84, h = 36.04, r = 1.0}, 
    HiddenCoords = {x = -1448.95, y = -548.47, z = 72.84, h = 127.01, r = 1.0}, 
    CamCoords = {x = -1456.11, y = -547.92, z = 72.84, h = 215.79, r = 1.0}, 
}

local choosingCharacter = false
local cam = nil

function disableshit(bool)
    if bool then
        print('a')
        TriggerEvent('close:ui:hud')
        openCharMenu(false)
        SetEntityAsMissionEntity(charPed, true, true)
        DeleteEntity(charPed)
    else
        TriggerEvent('open:ui:hud')
        openCharMenu(true)
    end
end

function openCharMenu(bool)
    print(bool)
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        action = "ui",
        toggle = bool,
    })
    choosingCharacter = bool
    skyCam(bool)
end

RegisterNUICallback('closeUI', function()
    openCharMenu(false)
    TriggerEvent('open:ui:hud')
end)

RegisterNUICallback('disconnectButton', function()
    SetEntityAsMissionEntity(charPed, true, true)
    DeleteEntity(charPed)
    TriggerServerEvent('qb-multicharacter:server:disconnect')
end)

RegisterNUICallback('selectCharacter', function(data)
    local cData = data.cData
    DoScreenFadeOut(10)
    TriggerServerEvent('qb-multicharacter:server:loadUserData', cData)
    openCharMenu(false)
    SetEntityAsMissionEntity(charPed, true, true)
    DeleteEntity(charPed)
    TriggerServerEvent("st-scoreboard:GiveMePlayers")
end)

RegisterNetEvent('qb-multicharacter:client:closeNUI')
AddEventHandler('qb-multicharacter:client:closeNUI', function()
    SetNuiFocus(false, false)
    TriggerServerEvent("st-scoreboard:GiveMePlayers")
end)

local Countdown = 1

RegisterNetEvent('qb-multicharacter:client:chooseChar')
AddEventHandler('qb-multicharacter:client:chooseChar', function()
    SetTimecycleModifier('hud_def_blur')
    SetTimecycleModifierStrength(0.0)
    if not IsPlayerSwitchInProgress() then
        SwitchOutPlayer(PlayerPedId(), 1, 1)
    end
    while GetPlayerSwitchState() ~= 5 do
        Citizen.Wait(0)
        ClearScreen()
        disableshit(true)
    end
    ClearScreen()
    Citizen.Wait(0)
    SetEntityCoords(GetPlayerPed(-1), Config.HiddenCoords.x, Config.HiddenCoords.y, Config.HiddenCoords.z)
    local timer = GetGameTimer()
    ShutdownLoadingScreenNui()
	FreezeEntityPosition(GetPlayerPed(-1), true)
    SetEntityVisible(GetPlayerPed(-1), false, false)
    Citizen.CreateThread(function()
        RequestCollisionAtCoord(-1453.29, -551.6, 72.84)
        while not HasCollisionLoadedAroundEntity(GetPlayerPed(-1)) do
            print('[Liq-multicharacter] Loading spawn collision.')
            Wait(0)
        end
    end)
    Citizen.Wait(3500)

    while true do
        ClearScreen()
        Citizen.Wait(0)
        if GetGameTimer() - timer > 5000 then
            SwitchInPlayer(PlayerPedId())
            ClearScreen()
            CreateThread(function()
                Wait(4000)
            end)

            while GetPlayerSwitchState() ~= 12 do
                Citizen.Wait(0)
                ClearScreen()
            end
            
            break
        end
    end
    NetworkSetTalkerProximity(0.0)
    openCharMenu(true)
end)

function ClearScreen()
    SetCloudHatOpacity(cloudOpacity)
    HideHudAndRadarThisFrame()
    SetDrawOrigin(0.0, 0.0, 0.0, 0)
end

function selectChar()
    openCharMenu(true)
end

RegisterNUICallback('asdasdasdsa', function(data)
local cData = data.cData
DeleteEntity(charPed)
end)

RegisterNetEvent('multichar:logout')
AddEventHandler('multichar:logout', function(data)
    SetTimecycleModifier('hud_def_blur')
    SetTimecycleModifierStrength(0.0)
    if not IsPlayerSwitchInProgress() then
        SwitchOutPlayer(PlayerPedId(), 1, 1)
    end
    while GetPlayerSwitchState() ~= 5 do
        Citizen.Wait(0)
        ClearScreen()
        disableshit(true)
    end
    ClearScreen()
    Citizen.Wait(0)
    SetEntityCoords(GetPlayerPed(-1), Config.HiddenCoords.x, Config.HiddenCoords.y, Config.HiddenCoords.z)
    local timer = GetGameTimer()
    ShutdownLoadingScreenNui()
	FreezeEntityPosition(GetPlayerPed(-1), true)
    SetEntityVisible(GetPlayerPed(-1), false, false)
    Citizen.CreateThread(function()
        RequestCollisionAtCoord(-1453.29, -551.6, 72.84)
        while not HasCollisionLoadedAroundEntity(GetPlayerPed(-1)) do
            print('[Liq-multicharacter] Loading spawn collision.')
            Wait(0)
        end
    end)
    Citizen.Wait(3500)

    while true do
        ClearScreen()
        Citizen.Wait(0)
        if GetGameTimer() - timer > 5000 then
            SwitchInPlayer(PlayerPedId())
            ClearScreen()
            CreateThread(function()
                Wait(4000)
            end)

            while GetPlayerSwitchState() ~= 12 do
                Citizen.Wait(0)
                ClearScreen()
            end
            
            break
        end
    end
    NetworkSetTalkerProximity(0.0)
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = "logout",
            toggle = true,
        })
        choosingCharacter = true
        skyCam(true)
end)

RegisterNUICallback('cDataPed', function(data)
    local cData = data.cData
    SetEntityAsMissionEntity(charPed, true, true)
    DeleteEntity(charPed)

    if cData ~= nil then
        QBCore.Functions.TriggerCallback('qb-multicharacter:server:getSkin', function(model, drawables, inf, props, drawtextures, proptextures)
            model = model ~= nil and tonumber(model) or false
            if model ~= nil then
                Citizen.CreateThread(function()
                    RequestModel(model)
                    while not HasModelLoaded(model) do
                        Citizen.Wait(0)
                    end
                    charPed = CreatePed(2, model, Config.PedCoords.x, Config.PedCoords.y, Config.PedCoords.z - 0.98, Config.PedCoords.h, false, true)
                    SetPedComponentVariation(charPed, 0, 0, 0, 2)
                    
                    PlaceObjectOnGroundProperly(charPed)
                    
                    data = json.decode(drawables)
                    TriggerEvent('clothes:loadSkin', data, charPed)
                    print(data)
					TaskGoStraightToCoord(charPed, -1453.66,-551.25,72.84, 1.0, -1, 72.84, 786603, 1.0)
					Wait(5000)
				--[[	local x,y,z = table.unpack(GetEntityCoords(charPed, true))
					RequestAnimDict("misscarsteal4@aliens")
      while not HasAnimDictLoaded("misscarsteal4@aliens") do
        Wait(1)
      end
					TaskPlayAnim(charPed,"misscarsteal4@aliens","rehearsal_base_idle_director",1.0,-1.0, -1, 1, 1, true, true, true)--]]
			FreezeEntityPosition(charPed, false)
            SetEntityInvincible(charPed, true)
			SetBlockingOfNonTemporaryEvents(charPed, true)
                end)
            else
                Citizen.CreateThread(function()
                    local randommodels = {
                        "mp_m_freemode_01",
                        "mp_f_freemode_01",
                    }
                    local model = GetHashKey(randommodels[math.random(1, #randommodels)])
                    RequestModel(model)
                    while not HasModelLoaded(model) do
                        Citizen.Wait(0)
                    end
                    charPed = CreatePed(2, model, Config.PedCoords.x, Config.PedCoords.y, Config.PedCoords.z - 0.98, Config.PedCoords.h, false, true)
                    SetPedComponentVariation(charPed, 0, 0, 0, 2)
                    
                    PlaceObjectOnGroundProperly(charPed)
                    TaskGoStraightToCoord(charPed, -1453.66,-551.25,72.84, 1.0, -1, 72.84, 786603, 1.0)
					Wait(5000)
					--[[local x,y,z = table.unpack(GetEntityCoords(charPed, true))
					RequestAnimDict("misscarsteal4@aliens")
      while not HasAnimDictLoaded("misscarsteal4@aliens") do
        Wait(1)
      end
					TaskPlayAnim(charPed,"misscarsteal4@aliens","rehearsal_base_idle_director",1.0,-1.0, -1, 1, 1, true, true, true)--]]
			FreezeEntityPosition(charPed, false)
            SetEntityInvincible(charPed, true)
			SetBlockingOfNonTemporaryEvents(charPed, true)
                end)
            end
        end, cData.citizenid)
    else
        Citizen.CreateThread(function()
            local randommodels = {
                "mp_m_freemode_01",
                "mp_f_freemode_01",
            }
            local model = GetHashKey(randommodels[math.random(1, #randommodels)])
            RequestModel(model)
            while not HasModelLoaded(model) do
                Citizen.Wait(0)
            end
            charPed = CreatePed(2, model, Config.PedCoords.x, Config.PedCoords.y, Config.PedCoords.z - 0.98, Config.PedCoords.h, false, true)
            SetPedComponentVariation(charPed, 0, 0, 0, 2)
            
            PlaceObjectOnGroundProperly(charPed)
            
			TaskGoStraightToCoord(charPed, -1453.66,-551.25,72.84, 1.0, -1, 72.84, 786603, 1.0)
			Wait(5000)
			--[[local x,y,z = table.unpack(GetEntityCoords(charPed, true))
					RequestAnimDict("misscarsteal4@aliens")
      while not HasAnimDictLoaded("misscarsteal4@aliens") do
        Wait(1)
      end
					TaskPlayAnim(charPed,"misscarsteal4@aliens","rehearsal_base_idle_director",1.0,-1.0, -1, 1, 1, true, true, true)--]]
			FreezeEntityPosition(charPed, false)
			
            SetEntityInvincible(charPed, true)
			SetBlockingOfNonTemporaryEvents(charPed, true)
			
        end)
    end
end)

RegisterNUICallback('setupCharacters', function()
    QBCore.Functions.TriggerCallback("test:yeet", function(result)
        SendNUIMessage({
            action = "setupCharacters",
            characters = result
        })
    end)
end)

RegisterNUICallback('removeBlur', function()
    SetTimecycleModifier('default')
end)

RegisterNUICallback('createNewCharacter', function(data)
    local cData = data
    if cData.gender == "Male" then
        cData.gender = 0
    elseif cData.gender == "Female" then
        cData.gender = 1
    end
    TriggerServerEvent('qb-multicharacter:server:createCharacter', cData)
    TriggerServerEvent('qb-multicharacter:server:GiveStarterItems')
    Citizen.Wait(500)
end)

RegisterNUICallback('removeCharacter', function(data)
    TriggerServerEvent('qb-multicharacter:server:deleteCharacter', data.citizenid)
    Wait(800)
    openCharMenu(false)
    TriggerEvent('qb-multicharacter:client:chooseChar')
end)

function skyCam(bool)
    SetRainFxIntensity(0.0)
    -- TriggerEvent('Pt_Weathersync:client:DisableSync')
    SetWeatherTypePersist('EXTRASUNNY')
    SetWeatherTypeNow('EXTRASUNNY')
    SetWeatherTypeNowPersist('EXTRASUNNY')
    NetworkOverrideClockTime(12, 0, 0)
 
    if bool then
        DoScreenFadeIn(1000)
        SetTimecycleModifier('hud_def_blur')
        SetTimecycleModifierStrength(1.0) 
        FreezeEntityPosition(GetPlayerPed(-1), false)
        cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", -1456.11, -547.92, 73.1, 0.0 ,0.0, 216.53, 45.00, false, 0)
        SetCamActive(cam, true)
        RenderScriptCams(true, false, 1, true, true)
    else
        SetTimecycleModifier('default')
        SetCamActive(cam, false)
        DestroyCam(cam, true)
        RenderScriptCams(false, false, 1, true, true)
        FreezeEntityPosition(GetPlayerPed(-1), false)
    end
end