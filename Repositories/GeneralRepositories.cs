﻿using Client.Contracts;
using Newtonsoft.Json;
using Server.Utilities.Handler;
using System.Text;

namespace Client.Repositories;

public class GeneralRepository<Entity, TId> : IRepository<Entity, TId>
        where Entity : class
{
    protected readonly string request;
    private readonly HttpContextAccessor contextAccessor;
    protected HttpClient httpClient;

    //constructor
    public GeneralRepository(string request)
    {
        this.request = request;
        httpClient = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:7134/Server/")
        };
        //contextAccessor = new HttpContextAccessor();
        // Ini yg bawah skip dulu
        //httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", contextAccessor.HttpContext?.Session.GetString("JWToken"));
    }

    public async Task<ResponseOKHandler<Entity>> Delete(TId id)
    {
        using (var response = await httpClient.DeleteAsync($"{request}{id}"))
        {
            response.EnsureSuccessStatusCode();
            string apiResponse = await response.Content.ReadAsStringAsync();
            var entityVM = JsonConvert.DeserializeObject<ResponseOKHandler<Entity>>(apiResponse);
            return entityVM;
        }
    }

    public async Task<ResponseOKHandler<IEnumerable<Entity>>> Get()
    {
        ResponseOKHandler<IEnumerable<Entity>> entityVM = null;
        using (var response = await httpClient.GetAsync(request))
        {
            string apiResponse = await response.Content.ReadAsStringAsync();
            entityVM = JsonConvert.DeserializeObject<ResponseOKHandler<IEnumerable<Entity>>>(apiResponse);
        }
        return entityVM;
    }

    public async Task<ResponseOKHandler<Entity>> Get(TId id)
    {
        using (var response = await httpClient.GetAsync($"{request}{id}"))
        {
            response.EnsureSuccessStatusCode();
            string apiResponse = await response.Content.ReadAsStringAsync();
            var entityVM = JsonConvert.DeserializeObject<ResponseOKHandler<Entity>>(apiResponse);
            return entityVM;
        }
    }

    public async Task<ResponseOKHandler<Entity>> Post(Entity entity)
    {
        string jsonEntity = JsonConvert.SerializeObject(entity);
        StringContent content = new StringContent(jsonEntity, Encoding.UTF8, "application/json");

        using (var response = await httpClient.PostAsync($"{request}", content))
        {
            response.EnsureSuccessStatusCode();
            string apiResponse = await response.Content.ReadAsStringAsync();
            var entityVM = JsonConvert.DeserializeObject<ResponseOKHandler<Entity>>(apiResponse);
            return entityVM;
        }
    }

    public async Task<ResponseOKHandler<Entity>> Put(TId id, Entity entity)
    {

        string jsonEntity = JsonConvert.SerializeObject(entity);
        StringContent content = new StringContent(jsonEntity, Encoding.UTF8, "application/json");

        using (var response = await httpClient.PutAsync($"{request}", content))
        {
            response.EnsureSuccessStatusCode();
            string apiResponse = await response.Content.ReadAsStringAsync();
            var entityVM = JsonConvert.DeserializeObject<ResponseOKHandler<Entity>>(apiResponse);
            return entityVM;
        }
    }


}