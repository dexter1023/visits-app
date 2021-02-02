using Microsoft.AspNetCore.Mvc;
using System;

public abstract class AbstractBaseController : Controller
{
    protected int GetUserId()
    {
        return Convert.ToInt32(User.Identity.Name);
    }
}